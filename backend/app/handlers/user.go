package handlers

import (
	"backend/app/handlers/dtos"
	"backend/app/models"
	"backend/app/services"
	"backend/app/services/security"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mitchellh/mapstructure"
	"gorm.io/gorm"
)

func GetUser(ctx *gin.Context) {
	db := ctx.MustGet("db").(*gorm.DB)
	sessionToken := ctx.MustGet("sessionToken").(*security.SessionTokenPayload)

	var user models.User
	result := db.Preload("Projects").First(&user, sessionToken.UserId)
	if result.Error != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"userError": "Unauthorized. Please login to access this info.",
		})
		return
	}

	var responseDto dtos.UserRequestDTO
	err := mapstructure.Decode(user, &responseDto)
	if err != nil {
		fmt.Println(err)
		return
	}

	ctx.JSON(http.StatusOK, responseDto)
}

func CreateUser(ctx *gin.Context) {
	/* Create the user in the DB */

	var dto dtos.CreateUserRequestDTO
	db := ctx.MustGet("db").(*gorm.DB)

	err := ctx.BindJSON(&dto)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"userError": "There was an error submitting your request. Please try again later."},
		)
		return
	}

	// Check if a user already exists with the same email
	userExists := services.UserExists(dto.Email, db)
	if userExists {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"userError": "User with that email already exists!"},
		)
		return
	}

	user, err := services.CreateUserInDB(dto, db)
	if err != nil {
		ctx.JSON(
			http.StatusInternalServerError,
			gin.H{"userError": "Error creating user. Please try again later."},
		)
		return
	}

	var responseDto dtos.UserRequestDTO
	mapstructure.Decode(user, &responseDto)

	ctx.JSON(http.StatusCreated, gin.H{"userMsg": "User created!", "user": responseDto})
}

func LoginUser(ctx *gin.Context) {
	/**
	 * Check that the user matches the email & password hash
	 * and set a Session Token (JWT) cookie
	 */

	var dto dtos.LoginUserDTO
	err := ctx.BindJSON(&dto)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"userError": "There was an error submitting your request. Please try again later."},
		)
		return
	}

	db := ctx.MustGet("db").(*gorm.DB)
	user, err := services.CheckUserAuthentication(dto, db)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{
			"userError": "Incorrect Email + Password.",
		})
		return
	}

	sessionToken, err := security.GenerateJWT(user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"userError": "Internal Error. Please try again later or report the error.",
		})
		return
	}

	cookie := &http.Cookie{
		Name:     "sessionToken",
		Value:    sessionToken,
		Path:     "/",
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteNoneMode,
		Domain:   os.Getenv("DOMAIN"),
		Expires:  time.Now().Add(24 * time.Hour),
	}

	http.SetCookie(ctx.Writer, cookie)

	ctx.JSON(http.StatusAccepted, gin.H{
		"userMsg":      "Logged in!",
		"sessionToken": sessionToken,
	})
}

package handlers

import (
	"backend/app/handlers/dtos"
	"backend/app/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateUser(ctx *gin.Context) {
	/* Create the user in the DB */

	var dto dtos.CreateUserDTO
	db, _ := ctx.MustGet("db").(*gorm.DB)

	err := ctx.BindJSON(&dto)
	if err != nil {
		ctx.JSON(
			http.StatusBadRequest,
			gin.H{"userError": "There was an error submitting your request. Please try again later."},
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

	ctx.JSON(http.StatusCreated, gin.H{"userMsg": "User created!", "user": user})
}

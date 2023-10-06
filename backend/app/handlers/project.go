package handlers

import (
	"backend/app/handlers/dtos"
	"backend/app/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateProject(ctx *gin.Context) {
	var dto dtos.CreateProjectRequestDTO
	err := ctx.BindJSON(&dto)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"userError": "Internal error, please try again or report the problem.",
		})
		return
	}

	db := ctx.MustGet("db").(*gorm.DB)
	project, err := services.CreateProjectInDB(dto, db)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"userError": "Failed to create project",
		})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"userMsg": "Project created!",
		"project": project,
	})
}

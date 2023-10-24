package handlers

import (
	"backend/app/handlers/dtos"
	"backend/app/models"
	"backend/app/services"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mitchellh/mapstructure"
	"gorm.io/gorm"
)

func CreateProject(ctx *gin.Context) {
	var dto dtos.CreateProjectDTO
	err := ctx.BindJSON(&dto)
	if err != nil {
		fmt.Println(err)
		ctx.JSON(http.StatusBadRequest, gin.H{
			"userError": "Internal error, please try again or report the problem.",
		})
		return
	}

	db := ctx.MustGet("db").(*gorm.DB)
	project, err := services.CreateProjectInDB(dto, db)
	if err != nil {
		fmt.Println(err)
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

func DeleteProject(ctx *gin.Context) {
	var dto dtos.DeleteProjectDTO
	err := ctx.BindJSON(&dto)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"userError": "Internal error, please try again or report the problem.",
		})
		return
	}

	db := ctx.MustGet("db").(*gorm.DB)

	var project models.Project
	result := db.First(&project, dto.ID)
	if result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"userError": "Project not found.",
		})
		return
	}
	result = db.Delete(&project)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"userError": "Couldn't delete project.",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"userMsg": "Deleted successfully!",
	})
}

func UpdateProject(ctx *gin.Context) {
	var dto dtos.UpdateProjectDTO
	err := ctx.BindJSON(&dto)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"userError": "Internal error, please try again or report the problem.",
		})
		return
	}

	db := ctx.MustGet("db").(*gorm.DB)

	var project models.Project
	result := db.First(&project, dto.ID)
	if result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"userError": "Project not found.",
		})
		return
	}

	result = db.Model(&models.Project{}).Where(&models.Project{ID: dto.ID}).Updates(dto)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"userError": "Internal error - failed to update the project. Please report the problem.",
		})
		return
	}

	var updatedProject models.Project
	result = db.First(&updatedProject, project.ID)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"userError": "Internal error - failed to fetch project. Please report the problem.",
		})
		return
	}

	var responseDto dtos.ProjectRequestDTO
	mapstructure.Decode(updatedProject, &responseDto)

	ctx.JSON(http.StatusAccepted, gin.H{
		"userMsg": "Successfully updated project!",
		"project": responseDto,
	})
}

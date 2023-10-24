package services

import (
	"backend/app/handlers/dtos"
	"backend/app/models"
	"strconv"

	"gorm.io/gorm"
)

func CreateProjectInDB(dto dtos.CreateProjectDTO, db *gorm.DB) (models.Project, error) {
	idU64, err := strconv.ParseUint(dto.UserID, 10, 32)
	if err != nil {
		return models.Project{}, err
	}
	project := models.Project{
		Title:       dto.Title,
		Description: dto.Description,
		Status:      models.NOT_STARTED,
		UserID:      uint(idU64),
	}
	result := db.Create(&project)
	if result.Error != nil {
		return models.Project{}, result.Error
	}

	// Fetch the user from the database
	var user models.User
	if err := db.First(&user, uint(idU64)).Error; err != nil {
		return models.Project{}, err
	}

	// Update the user's projects
	if err := db.Model(&user).Association("Projects").Append(&project); err != nil {
		return models.Project{}, err
	}
	db.Preload("Projects").First(&user, user.ID)

	return project, nil
}

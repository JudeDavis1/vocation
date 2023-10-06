package services

import (
	"backend/app/handlers/dtos"
	"backend/app/models"
	"strconv"

	"gorm.io/gorm"
)

func CreateProjectInDB(dto dtos.CreateProjectRequestDTO, db *gorm.DB) (models.Project, error) {
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
	result := db.Create(project)
	if result.Error != nil {
		return models.Project{}, result.Error
	}

	return project, nil
}

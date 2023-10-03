package services

import (
	"backend/app/handlers/dtos"
	"backend/app/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func CreateUserInDB(dto dtos.CreateUserDTO, db *gorm.DB) (models.User, error) {
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(dto.Password), 12)
	dto.Password = ""
	if err != nil {
		return models.User{}, err
	}

	user := models.User{
		Firstname:    dto.Firstname,
		Lastname:     dto.Lastname,
		Email:        dto.Email,
		PasswordHash: string(passwordHash),
	}
	result := db.Create(&user)
	if result.Error != nil {
		return models.User{}, result.Error
	}

	return user, nil
}

func UserExists(email string, db *gorm.DB) bool {
	var existingUsers int64
	db.Model(&models.User{}).Where(&models.User{Email: email}).Count(&existingUsers)

	return existingUsers > 0
}

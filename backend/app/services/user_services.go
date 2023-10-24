package services

import (
	"backend/app/handlers/dtos"
	"backend/app/models"
	"fmt"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func CreateUserInDB(dto dtos.CreateUserRequestDTO, db *gorm.DB) (models.User, error) {
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

func CheckUserAuthentication(dto dtos.LoginUserDTO, db *gorm.DB) (models.User, error) {
	var user models.User
	result := db.First(&user, models.User{Email: dto.Email})
	if result.Error != nil {
		fmt.Println(result.Error)
		return models.User{}, result.Error
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(dto.Password))
	fmt.Println(err)
	return user, err
}

package models

import "gorm.io/gorm"

type UserType string

const (
	REGULAR UserType = "Regular"
	MANAGER UserType = "Manager"
)

type User struct {
	gorm.Model

	Firstname string
	Lastname  string

	Role         string
	Email        string `gorm:"unique"`
	PasswordHash string
	UserType     UserType

	AnnualLeaveDays int

	CurrentProjects   []Project `gorm:"foreignKey:UserID"`
	CompletedProjects []Project `gorm:"foreignKey:UserID"`
}

func (user *User) FullName() string {
	return user.Firstname + " " + user.Lastname
}

package models

import "gorm.io/gorm"

type UserType string

const (
	REGULAR UserType = "REGULAR"
	MANAGER UserType = "MANAGER"
)

type User struct {
	gorm.Model

	ID uint `gorm:"primarykey"`

	Firstname string
	Lastname  string

	Role         string
	Email        string `gorm:"unique"`
	PasswordHash string
	UserType     UserType

	AnnualLeaveDays int

	Projects []Project `gorm:"foreignKey:UserID"`
}

func (user *User) FullName() string {
	return user.Firstname + " " + user.Lastname
}

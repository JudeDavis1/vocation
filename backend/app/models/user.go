package models

import "gorm.io/gorm"

type UserType int

const (
	REGULAR UserType = iota
	MANAGER
)

type User struct {
	gorm.Model

	Firstname string
	Lastname  string

	Role         string
	Email        string
	PasswordHash string
	UserType     UserType

	AnnualLeaveDays int

	CurrentProjects   []Project `gorm:"foreignKey:UserID"`
	CompletedProjects []Project `gorm:"foreignKey:UserID"`
}

func (user *User) FullName() string {
	return user.Firstname + " " + user.Lastname
}

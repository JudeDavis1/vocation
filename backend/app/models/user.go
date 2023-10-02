package models

import "gorm.io/gorm"

type UserType int

const (
	REGULAR UserType = iota
	MANAGER
)

type User struct {
	gorm.Model

	Name     string
	Role     string
	Email    string
	UserType UserType

	AnnualLeaveDays int

	CurrentProjects   []Project `gorm:"foreignKey:UserID"`
	CompletedProjects []Project `gorm:"foreignKey:UserID"`
}

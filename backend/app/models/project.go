package models

import "gorm.io/gorm"

type ProjectStatus string

const (
	NOT_STARTED ProjectStatus = "Not Started"
	IN_PROGRESS ProjectStatus = "In Progress"
	COMPLETED   ProjectStatus = "Completed"
)

type Project struct {
	gorm.Model

	Title       string
	Description string
	Status      ProjectStatus

	UserID uint
}

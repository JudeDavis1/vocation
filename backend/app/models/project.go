package models

import "gorm.io/gorm"

type ProjectStatus string

const (
	NOT_STARTED ProjectStatus = "NOT_STARTED"
	IN_PROGRESS ProjectStatus = "IN_PROGRESS"
	COMPLETED   ProjectStatus = "COMPLETED"
)

type Project struct {
	gorm.Model

	ID uint `gorm:"primarykey"`

	Title       string
	Description string
	Status      ProjectStatus

	UserID uint
}

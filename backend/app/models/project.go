package models

import "gorm.io/gorm"

type Project struct {
	gorm.Model

	Title string

	UserID uint
}

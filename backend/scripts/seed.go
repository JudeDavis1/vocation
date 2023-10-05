package main

import (
	"backend/app/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	DB_URL := "host=localhost user=postgres password=postgres dbname=postgres port=5432 sslmode=disable"

	db, err := gorm.Open(postgres.Open(DB_URL), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}

	// Clear database
	db.Migrator().DropTable(&models.User{})
	db.Migrator().DropTable(&models.Project{})
}

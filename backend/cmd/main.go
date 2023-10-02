package main

import (
	"backend/app/middleware"
	"backend/app/models"
	"backend/app/routes"

	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	godotenv.Load(".env.secret")
	DB_URL := os.Getenv("DB_URL")
	r := gin.Default()

	db, err := gorm.Open(postgres.Open(DB_URL), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}

	r.Use(middleware.DatabaseSession(db))

	models.SetupModels(db)
	routes.SetupRoutes(r)

	fmt.Println("START")

	r.Run("0.0.0.0:8080")
}

package main

import (
	"backend/app/middleware"
	"backend/app/models"
	"backend/app/routes"

	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	err := godotenv.Load(".env.secret")
	if err != nil {
		fmt.Println(err)
		return
	}
	DB_URL := os.Getenv("DB_URL")
	fmt.Println("DB_URL")
	fmt.Println(DB_URL)
	r := gin.Default()

	// Configuring CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	config.AllowCredentials = true

	r.Use(cors.New(config))

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

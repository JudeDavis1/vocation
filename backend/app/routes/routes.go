package routes

import (
	"backend/app/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	base := r.Group("/api/v1")

	/* Endpoints here */

	base.GET("/hello", handlers.Hello)

	// Users
	base.POST("/user/create", handlers.CreateUser)
}

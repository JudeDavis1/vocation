package routes

import (
	"backend/app/handlers"
	"backend/app/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	base := r.Group("/api/v1")

	/* Endpoints here */

	base.GET("/hello", handlers.Hello)

	// Users
	base.POST("/user/create", handlers.CreateUser)
	base.POST("/user/login", handlers.LoginUser)
	base.GET("/user", middleware.Authenticate(), handlers.GetUser)
}

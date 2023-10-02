package routes

import (
	"backend/app/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes() *gin.Engine {
	r := gin.Default()

	// Endpoints here
	r.GET("/api/v1/hello", handlers.Hello)

	return r
}

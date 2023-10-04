package middleware

import (
	"backend/app/services/security"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Authenticate() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		cookie, err := ctx.Request.Cookie("sessionToken")
		if err != nil {
			jsonUnauthorized(ctx)
			return
		}
		err = security.VerifyJWT(cookie.Value)
		if err != nil {
			jsonUnauthorized(ctx)
			return
		}

		ctx.Next()
	}
}

func jsonUnauthorized(ctx *gin.Context) {
	ctx.JSON(http.StatusUnauthorized, gin.H{"userError": "You need to be logged in to access this resource."})
	ctx.Abort()
}

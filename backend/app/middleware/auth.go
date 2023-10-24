package middleware

import (
	"backend/app/services/security"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Authenticate() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		cookie, err := ctx.Request.Cookie("sessionToken")
		if err != nil {
			fmt.Println(err)
			jsonUnauthorized(ctx)
			return
		}
		payload, err := security.VerifyJWT(cookie.Value)
		if err != nil {
			fmt.Println(err)
			jsonUnauthorized(ctx)
			return
		}

		ctx.Set("sessionToken", payload)

		// We don't want to run ctx.Next() if there's an auth error
		ctx.Next()
	}
}

func jsonUnauthorized(ctx *gin.Context) {
	ctx.JSON(http.StatusUnauthorized, gin.H{"userError": "You need to be logged in to access this resource."})
	ctx.Abort()
}

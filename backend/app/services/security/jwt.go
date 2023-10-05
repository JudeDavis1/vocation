package security

import (
	"backend/app/models"
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

type SessionToken struct {
	TokenValue string
	Expiry     int64
}

func GenerateJWT(user models.User) (SessionToken, error) {
	jwtSecret := []byte(os.Getenv("JWT_SECRET"))
	days := time.Hour * 24
	expiry := time.Now().Add(days * 14).Unix()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": user.ID,
	})
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		return SessionToken{}, err
	}

	sessionToken := SessionToken{
		TokenValue: tokenString,
		Expiry:     expiry,
	}

	return sessionToken, nil
}

func VerifyJWT(tokenString string) error {
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil || !token.Valid {
		return errors.New("jwt token not valid")
	}

	return nil
}

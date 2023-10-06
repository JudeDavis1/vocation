package security

import (
	"backend/app/models"
	"errors"
	"fmt"
	"os"

	"github.com/golang-jwt/jwt"
)

type SessionTokenPayload struct {
	jwt.StandardClaims
	UserId string
}

func GenerateJWT(user models.User) (string, error) {
	jwtSecret := []byte(os.Getenv("JWT_SECRET"))
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, SessionTokenPayload{
		UserId: fmt.Sprint(user.ID),
	})
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func VerifyJWT(tokenString string) (*SessionTokenPayload, error) {
	token, err := jwt.ParseWithClaims(tokenString, &SessionTokenPayload{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil || !token.Valid {
		return &SessionTokenPayload{}, errors.New("jwt token not valid")
	}

	return token.Claims.(*SessionTokenPayload), nil
}

package utils

import (
	"crypto/rand"
	"encoding/base64"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func getAccessSecret() []byte {
	secret := os.Getenv("ACCESS_SECRET_KEY")
	if secret == "" {
		return []byte("ACCESS_SECRET_KEY")
	}
	return []byte(secret)
}

func getRefreshSecret() []byte {
	secret := os.Getenv("REFRESH_SECRET_KEY")
	if secret == "" {
		return []byte("REFRESH_SECRET_KEY")
	}
	return []byte(secret)
}
func GenerateAccessToken(userID uint) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"type":    "access",
		"exp":     time.Now().Add(15 * time.Minute).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(getAccessSecret())
}

func GenerateRefreshToken() (string, error) {
	b := make([]byte, 32)

	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}

	return base64.URLEncoding.EncodeToString(b), nil
}
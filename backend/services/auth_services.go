package services

import (
	// "net/http"
	// "triptix/dto"
	"triptix/models"
	"triptix/repository"

	"triptix/utils"

	// "github.com/gin-gonic/gin"
)

func RegisterUser(user models.User) (models.User, error) {
	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		return user, err
	}
	user.Password = hashedPassword

	result, err := repository.RegisterUser(user)
	if err != nil {
		return user, err
	}
	return result, err
	
}
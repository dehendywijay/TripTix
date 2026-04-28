package services

import (
	"triptix/config"
	"triptix/models"
)

func CreateUser(data models.User) (models.User, error) {
	err := config.DB.Create(&data).Error
	return data, err
}
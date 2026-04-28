package services

import (
	"fmt"
	"triptix/config"
	"triptix/models"
	"triptix/utils"
)

func RegisterUser(data models.User) (models.User, error) {
	err := config.DB.Create(&data).Error
	return data, err
}

func LoginUser(email string, password string) (models.User, error) {
	var user models.User
	err := config.DB.Where("email = ?", email).First(&user).Error
	if err != nil {
		return user, err
	}

	if !utils.CheckPassword(user.Password, password) {
		return user, fmt.Errorf("invalid credentials")
	}

	return user, nil
}

func GetUser(email string) (models.User, error) {
	var user models.User
	err := config.DB.Select("nama", "email").Preload("Reviews").Where("email = ?", email).First(&user).Error
	return user, err
}

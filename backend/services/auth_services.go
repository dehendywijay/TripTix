package services

import (
	"fmt"
	"triptix/config"
	"triptix/dto"
	"triptix/models"
	"triptix/utils"
)

func RegisterUser(data models.User) (models.User, error) {
	err := config.DB.Create(&data).Error
	return data, err
}

func LoginUser(email string, password string) (dto.LoginRespone, error) {
	var user models.User
	err := config.DB.Where("email = ?", email).First(&user).Error
	if err != nil {
		return dto.LoginRespone{}, err
	}

	if !utils.CheckPassword(user.Password, password) {
		return dto.LoginRespone{}, fmt.Errorf("invalid credentials")
	}

	return dto.LoginRespone{
		Email: user.Email,
	}, nil
}

func GetUser(email string) (models.User, error) {
	var user models.User
	err := config.DB.Select("id", "nama", "email").Preload("Reviews").Where("email = ?", email).First(&user).Error
	return user, err
}

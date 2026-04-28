package services

import (
	"triptix/config"
	"triptix/models"
)

func CreateWisata(data models.Wisata) (models.Wisata, error) {
	err := config.DB.Create(&data).Error
	return data, err
}
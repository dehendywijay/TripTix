package services

import (
	"triptix/config"
	"triptix/models"
)

func CreateWisata(data models.Wisata) (models.Wisata, error) {
	err := config.DB.Create(&data).Error
	return data, err
}

func GetAllWisata() ([]models.Wisata, error) {
	var wisata []models.Wisata
	err := config.DB.Preload("Fotos").Preload("Reviews").Find(&wisata).Error
	return wisata, err
}

func GetWisataByID(id string) (models.Wisata, error) {
	var wisata models.Wisata
	err := config.DB.Preload("Fotos").Preload("Reviews").First(&wisata, id).Error
	return wisata, err
}
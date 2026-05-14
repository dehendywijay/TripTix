package repository

import (
	"fmt"
	"triptix/config"
	"triptix/dto"
	"triptix/models"
)

func CreateWisata(data models.Wisata) (models.Wisata, error) {
	err := config.DB.Create(&data).Error
	return data, err
}

func GetAllWisata() ([]dto.AllWisataResponse, error) {
	var response []dto.AllWisataResponse

	err := config.DB.
		Table("wisata").
		Select(`
			wisata.id,
			wisata.nama,
			wisata.alamat,
			wisata.harga,
			wisata.kategori,
			(
				SELECT fotos.url
				FROM fotos
				WHERE fotos.wisata_id = wisata.id
				ORDER BY fotos.id ASC
				LIMIT 1
			) AS foto
		`).
		Scan(&response).Error

	return response, err
}


func GetWisataByID(id string) (models.Wisata, error) {
	var wisata models.Wisata
	err := config.DB.Preload("Fotos").First(&wisata, id).Error
	return wisata, err
}

func CreateWisataFoto(
	data models.Foto,
) error {

	return config.DB.Create(&data).Error
}

func UpdateWisataFoto(
	data models.Foto,
	id string,
) error {

	return config.DB.
		Model(&models.Foto{}).
		Where("id = ?", id).
		Updates(data).Error
}

func EditWisata(
	id uint,
	data models.Wisata,
) (models.Wisata, error) {

	var wisata models.Wisata

	err := config.DB.
		Where("id = ?", id).
		First(&wisata).Error

	if err != nil {
		return models.Wisata{},
			fmt.Errorf("find wisata: %w", err)
	}

	err = config.DB.
		Model(&wisata).
		Updates(data).Error

	if err != nil {
		return models.Wisata{},
			fmt.Errorf("update wisata: %w", err)
	}

	return wisata, nil
}

func GetFotoWisata(id uint, idfoto string) (models.Foto, error){
	var fotos models.Foto

	err := config.DB.Where("wisata_id = ?", id).Find(&fotos, idfoto).Error
	return fotos, err
}



package services

import (
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

func CreateWisataFoto(data models.Foto) error {
	err := config.DB.Create(&data).Error
	return err
}

func EditWisata(id string, data models.Wisata) (models.Wisata, error) {
	var wisata models.Wisata

	err := config.DB.Where("ID = ? ", id).First(&wisata).Error
	if err != nil {
		return wisata, err
	}

	err = config.DB.Model(&wisata).Updates(data).Error
	return wisata, err
}

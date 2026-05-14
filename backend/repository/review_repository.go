package repository

import (
	"fmt"
	"triptix/config"
	"triptix/models"

	"gorm.io/gorm"
)

func CreateReview(
	data models.Review,
) error {

	return config.DB.Create(&data).Error
}

func GetWisataByIDWisata(
	id uint,
) (models.Wisata, error) {

	var wisata models.Wisata

	err := config.DB.
		Select("id", "nama").
		First(&wisata, id).Error

	if err != nil {
		return models.Wisata{},
			fmt.Errorf("get wisata: %w", err)
	}

	return wisata, nil
}

func GetReviewsByWisataID(
	wisataID uint,
) ([]models.Review, error) {

	var reviews []models.Review

	err := config.DB.
		Preload("User", func(db *gorm.DB) *gorm.DB {
			return db.Select("id", "nama")
		}).
		Where("wisata_id = ?", wisataID).
		Find(&reviews).Error

	if err != nil {
		return nil,
			fmt.Errorf("get reviews: %w", err)
	}

	return reviews, nil
}
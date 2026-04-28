package services

import (
	"triptix/config"
	"triptix/models"
)

func CreateReview(review models.Review) (models.Review, error) {
	err := config.DB.Create(&review).Error
	return review, err
}
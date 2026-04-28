package services

import (
	"triptix/config"
	"triptix/dto"
	"triptix/models"
)


func CreateReview(req dto.CreateReviewRequest) (dto.ReviewResponse, error) {
	review := models.Review{
		UserID:   req.UserID,
		WisataID: req.WisataID,
		Rating:   req.Rating,
		Comment:  req.Comment,
	}

	err := config.DB.Create(&review).Error
	if err != nil {
		return dto.ReviewResponse{}, err
	}

	return dto.ReviewResponse{
		ID:       review.ID,
		UserID:   review.UserID,
		WisataID: review.WisataID,
		Rating:   review.Rating,
		Comment:  review.Comment,
	}, nil
}


func GetReviewsByWisataID(wisataID uint) ([]models.Review, error) {
	var reviews []models.Review

	err := config.DB.
		Preload("User").
		Preload("Wisata").
		Where("wisata_id = ?", wisataID).
		Find(&reviews).Error

	return reviews, err
}
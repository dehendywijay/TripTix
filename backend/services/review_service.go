package services

import (
	"triptix/config"
	"triptix/dto"
	"triptix/models"

	"gorm.io/gorm"
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


func GetReviewsByWisataID(wisataID uint) (dto.ReviewsByWisataResponse, error) {

	var wisata models.Wisata
	err := config.DB.
		Select("id", "nama").
		First(&wisata, wisataID).Error
	if err != nil {
		return dto.ReviewsByWisataResponse{}, err
	}

	var reviews []models.Review
	err = config.DB.
		Preload("User", func(db *gorm.DB) *gorm.DB {
			return db.Select("id", "nama")
		}).
		Where("wisata_id = ?", wisataID).
		Find(&reviews).Error
	if err != nil {
		return dto.ReviewsByWisataResponse{}, err
	}

	var reviewResponses []dto.ReviewItemResponse
	for _, r := range reviews {
		reviewResponses = append(reviewResponses, dto.ReviewItemResponse{
			ID:      r.ID,
			Rating:  r.Rating,
			Comment: r.Comment,
			User: dto.UserReviewResponse{
				ID:   r.User.ID,
				Nama: r.User.Nama,
			},
		})
	}

	response := dto.ReviewsByWisataResponse{
		Wisata: dto.WisataReviewResponse{
			ID:   wisata.ID,
			Nama: wisata.Nama,
		},
		Reviews: reviewResponses,
	}

	return response, nil
}
package services

import (
	"fmt"
	"triptix/config"
	"triptix/dto"
	"triptix/models"
	"triptix/utils"

	"gorm.io/gorm"
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

func GetUser(email string) (dto.ReviewsByUserResponse ,error) {
	var user models.User
	err := config.DB.
		Select("id", "nama").
		Where("email = ?", email).
		First(&user).Error
	if err != nil {
		return dto.ReviewsByUserResponse{}, err
	}

	var reviews []models.Review
	err = config.DB.
		Preload("Wisata", func(db *gorm.DB) *gorm.DB {
			return db.Select("id", "nama")
		}).
		Where("user_id = ?", user.ID).
		Find(&reviews).Error
	if err != nil {
		return dto.ReviewsByUserResponse{}, err
	}

	var reviewResponses []dto.ReviewsItemByUserResponse
	for _, r := range reviews {
		reviewResponses = append(reviewResponses, dto.ReviewsItemByUserResponse{
			ID:      r.ID,
			Rating:  r.Rating,
			Comment: r.Comment,
			Wisata: dto.WisataReviewResponse{
				ID:   r.Wisata.ID,
				Nama: r.Wisata.Nama,
			},
		})
	}

	response := dto.ReviewsByUserResponse{
		User: dto.UserReviewResponse{
			ID:   user.ID,
			Nama: user.Nama,
		},
		Reviews: reviewResponses,
	}

	return response, nil
}

package services

import (
	"fmt"
	"time"
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
	err := config.DB.Select("id", "email").Where("email = ?", email).First(&user).Error
	if err != nil {
		return dto.LoginRespone{}, err
	}

	if !utils.CheckPassword(user.Password, password) {
		return dto.LoginRespone{}, fmt.Errorf("invalid credentials")
	}

	token, err := utils.GenerateAccessToken(user.ID)
	if err != nil {
		return dto.LoginRespone{}, err
	}

	return dto.LoginRespone{
		ID:    user.ID,
		Email: user.Email,
		Token: token,
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


func CreateRefreshToken(id uint, hash string) (models.RefreshToken, error) {
	refreshToken := models.RefreshToken{
		UserID: id, 
		TokenHash: hash,
		ExpiresAt: time.Now().Add(7 * 24 * time.Hour),
	 }
	err := config.DB.Create(&refreshToken).Error
	return refreshToken, err
}

func GetRefreshToken(hash string) (models.RefreshToken, error) {
	var refreshToken models.RefreshToken
	err := config.DB.Where("token_hash = ? AND revoked = false", hash).First(&refreshToken).Error
	return refreshToken, err
}

func RevokeRefreshToken(hash string) error {
	return config.DB.Model(&models.RefreshToken{}).Where("token_hash = ?", hash).Update("revoked", true).Error
}
package repository

import (
	"fmt"
	"time"
	"triptix/internal/dto"
	"triptix/internal/models"
	"triptix/pkg/utils"

	"gorm.io/gorm"
)

type AuthRepositoryInterface interface {
	RegisterUser(
		user *models.User,
	) error

	LoginUser(
		email string,
		password string,
	) (models.User, error)

	GetUser(email string) (dto.ReviewsByUserResponse, error)

	GetUserByID(id uint) (models.User, error)

	CreateRefreshToken(
		id uint,
		hash string,
	) (models.RefreshToken, error)

	GetRefreshToken(
		hash string,
	) (models.RefreshToken, error)

	RevokeRefreshToken(
		hash string,
	) error
}

type AuthRepository struct {
	GormDB *gorm.DB
}

// GetUserByID implements [AuthRepositoryInterface].
func (r *AuthRepository) GetUserByID(id uint) (models.User, error) {
	panic("unimplemented")
}

func (r *AuthRepository) RegisterUser(data *models.User) error {
	return r.GormDB.Create(&data).Error
}

func (r *AuthRepository) LoginUser(email string, password string) (models.User, error) {
	var user models.User
	err := r.GormDB.Select("id", "email", "password").Where("email = ?", email).First(&user).Error
	if err != nil {
		return user, err
	}

	if !utils.CheckPassword(user.Password, password) {
		return user, fmt.Errorf("invalid credentials")
	}

	return user, err
}

func (r *AuthRepository) GetUser(email string) (dto.ReviewsByUserResponse, error) {
	var user models.User
	err := r.GormDB.
		Select("id", "nama").
		Where("email = ?", email).
		First(&user).Error
	if err != nil {
		return dto.ReviewsByUserResponse{}, err
	}

	var reviews []models.Review
	err = r.GormDB.
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

func (r *AuthRepository) CreateRefreshToken(id uint, hash string) (models.RefreshToken, error) {
	refreshToken := models.RefreshToken{
		UserID:    id,
		TokenHash: hash,
		ExpiresAt: time.Now().Add(7 * 24 * time.Hour),
	}
	err := r.GormDB.Create(&refreshToken).Error
	return refreshToken, err
}

func (r *AuthRepository) GetRefreshToken(hash string) (models.RefreshToken, error) {
	var refreshToken models.RefreshToken
	err := r.GormDB.Where("token_hash = ? AND revoked = false", hash).First(&refreshToken).Error
	return refreshToken, err
}

func (r *AuthRepository) RevokeRefreshToken(hash string) error {
	return r.GormDB.Model(&models.RefreshToken{}).Where("token_hash = ?", hash).Update("revoked", true).Error
}

package services

import (
	
	"triptix/dto"
	"triptix/models"
	"triptix/repository"

	"triptix/utils"

)

func RegisterUser(user models.User) (models.User, error) {
	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		return user, err
	}
	user.Password = hashedPassword

	result, err := repository.RegisterUser(user)
	if err != nil {
		return user, err
	}
	return result, err
	
}

func LoginUser(user dto.LoginRequest) (dto.LoginRespone, error) {
	result, err := repository.LoginUser(user.Email, user.Password)
	if err != nil {
		return dto.LoginRespone{}, err
	}

	refreshTokenValue, err := utils.GenerateRefreshToken()
	if err != nil {
		return dto.LoginRespone{}, err
	}

	refreshTokenHash := utils.HashToken(refreshTokenValue)

	AccessToken, err := utils.GenerateAccessToken(result.ID)
	if err != nil {
		return dto.LoginRespone{}, err
	}

	_ , err = repository.CreateRefreshToken(result.ID, refreshTokenHash)
	if err != nil {
		return dto.LoginRespone{}, err
	}

	data := dto.LoginRespone{
		ID:            result.ID,
		Email:         result.Email,
		RefreshToken:  refreshTokenValue,
		AccesToken:    AccessToken,
	}

	return data, nil
}

func RefreshToken(req dto.RefreshTokenRequest) (string, error) {
	refreshTokenHash := utils.HashToken(req.RefreshToken)
	valid, err := repository.GetRefreshToken(refreshTokenHash)
	if err != nil {
		return " ", err
	}

	accesToken , err := utils.GenerateAccessToken(valid.UserID)
	if err != nil {
		return " ", err
	}

	return accesToken, nil
}

func LogoutUser(req dto.RefreshTokenRequest) error {
	hashedToken := utils.HashToken(req.RefreshToken)
	err := repository.RevokeRefreshToken(hashedToken)
	if err != nil {
		return err
	}

	return nil
}

func GetUser(email string) (dto.ReviewsByUserResponse, error) {
	result, err := repository.GetUser(email)
	if err != nil {
		return dto.ReviewsByUserResponse{}, err
	}
	return result, nil
}

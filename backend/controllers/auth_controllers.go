package controller

import (
	"net/http"
	"triptix/dto"
	"triptix/models"
	"triptix/repository"

	"triptix/utils"

	"github.com/gin-gonic/gin"
)

func RegisterUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := repository.RegisterUser(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Akun Berhasil Dibuat",
		"data":    user,
	})
}

func LoginUser(c *gin.Context) {
	var req struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Data tidak ditemukan",
		})
		return
	}

	user, err := repository.LoginUser(req.Email, req.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Password atau email Salah",
		})
		return
	}

	refreshTokenValue, err := utils.GenerateRefreshToken()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Gagal Generate Refresh Token",
		})
		return
	}

	refreshTokenHash := utils.HashToken(refreshTokenValue)

	token, err := utils.GenerateAccessToken(user.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Gagal Generate Refresh Token",
		})
		return
	}

	_ , err = repository.CreateRefreshToken(user.ID, refreshTokenHash)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Gagal membuat refresh token",
		})
		return
	}

	data := dto.LoginRespone{
		ID:            user.ID,
		Email:         user.Email,
		RefreshToken:  refreshTokenValue,
		AccesToken:    token,
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"data":    data ,
	})
}

func RefreshToken(c *gin.Context) {
	var req dto.RefreshTokenRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Data tidak ditemukan",
		})
		return
	}

	refreshTokenHash := utils.HashToken(req.RefreshToken)
	valid, err := repository.GetRefreshToken(refreshTokenHash)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "refresh token tidak valid",
		})
		return
	}

	accesToken , err := utils.GenerateAccessToken(valid.UserID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Gagal Generate Access Token",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Refresh token valid",
		"data": gin.H{
			"access_token": accesToken,
		},
	})

}

func LogoutUser(c *gin.Context) {

	var req dto.RefreshTokenRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid request",
		})
		return
	}

	hashedToken := utils.HashToken(req.RefreshToken)

	err := repository.RevokeRefreshToken(hashedToken)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "logout gagal",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "logout berhasil",
	})
}


func GetUser(c *gin.Context) {
	email := c.Param("email")

	if email == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Email dibutuhkan",
		})
		return
	}

	user, err := repository.GetUser(email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Email tidak ditemukan",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": user,
	})
}



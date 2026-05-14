package controller

import (
	"net/http"
	"triptix/dto"
	"triptix/models"
	"triptix/services"


	"github.com/gin-gonic/gin"
)

func RegisterUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := services.RegisterUser(user)
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
	var req dto.LoginRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Data tidak ditemukan",
		})
		return
	}

	data, err := services.LoginUser(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Login gagal",
		})
		return
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

	accesToken, err := services.RefreshToken(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Refresh token gagal",
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

	err := services.LogoutUser(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "logout gagal",
		})
		return
	}
	c.JSON(http.StatusNoContent, gin.H{
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

	user, err := services.GetUser(email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": user,
	})
}



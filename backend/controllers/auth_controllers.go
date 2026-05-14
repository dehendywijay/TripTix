package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"triptix/models"
	"triptix/services"
	"triptix/utils"
)

func RegisterUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	user.Password = hashedPassword
	user, err = services.RegisterUser(user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "User created successfully",
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

	user, err := services.LoginUser(req.Email, req.Password)
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

	_ , err = services.CreateRefreshToken(user.ID, refreshTokenHash)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Gagal membuat refresh token",
		})
		return
	}

	c.SetCookie(
		"refresh_token",
		refreshTokenValue,
		7*24*60*60, 
		"/",
		"",
		false, 
		true,  
	)

	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful",
		"data":    user,
	})
}

func RefreshToken(c *gin.Context) {
	refreshToken, err := c.Cookie("refresh_token")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Refresh token tidak ditemukan",
		})
		return
	}

	refreshTokenHash := utils.HashToken(refreshToken)
	valid, err := services.GetRefreshToken(refreshTokenHash)
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
	refreshToken, err := c.Cookie("refresh_token")
	if err == nil {

		hashedToken := utils.HashToken(refreshToken)

		err := services.RevokeRefreshToken(hashedToken)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": "Gagal Revoke Refresh Token",
			})
			return
		}
	}
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
			"error": "Email tidak ditemukan",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": user,
	})
}



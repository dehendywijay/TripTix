package controller

import (
	"net/http"
	

	"github.com/gin-gonic/gin"
	"triptix/models"
	"triptix/services"
	"triptix/dto"
)

func CreateReview(c *gin.Context) {
	var req dto.CreateReviewRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Data tidak ditemukan",
		})
		return
	}

	review := models.Review{
		UserID:   req.UserID,
		WisataID: req.WisataID,
		Rating:  req.Rating,
		Comment: req.Comment,
	}

	result, err := services.CreateReview(review)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Gagal membuat review",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Sukses membuat review",
		"data":    result,
	})
}
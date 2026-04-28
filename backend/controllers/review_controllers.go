package controller

import (
	"net/http"
	"strconv"

	"triptix/dto"
	"triptix/services"

	"github.com/gin-gonic/gin"
)

func CreateReview(c *gin.Context) {
	var req dto.CreateReviewRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Data tidak ditemukan",
		})
		return
	}

	result, err := services.CreateReview(req)
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

func GetReviewsByWisata(c *gin.Context) {
	wisataIDParam := c.Param("wisata_id")

	wisataID, err := strconv.Atoi(wisataIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid wisata id",
		})
		return
	}

	reviews, err := services.GetReviewsByWisataID(uint(wisataID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to get reviews",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": reviews,
	})
}
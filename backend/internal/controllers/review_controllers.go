package controller

import (
	"net/http"
	"strconv"

	"triptix/internal/dto"
	"triptix/internal/services"

	"github.com/gin-gonic/gin"
)

func CreateReview(c *gin.Context) {

	var req dto.CreateReviewRequest

	if err := c.ShouldBindJSON(&req); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "request tidak valid",
		})

		return
	}

	result, err := services.CreateReview(req)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "gagal membuat review",
		})

		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "review berhasil dibuat",
		"data":    result,
	})
}

func GetReviewsByWisata(c *gin.Context) {

	wisataIDParam := c.Param("wisata_id")

	wisataID, err := strconv.Atoi(
		wisataIDParam,
	)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "wisata id tidak valid",
		})

		return
	}

	reviews, err := services.GetReviewsByWisataID(
		uint(wisataID),
	)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "gagal mengambil review",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": reviews,
	})
}
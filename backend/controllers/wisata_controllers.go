package controller

import (
	"net/http"
	"triptix/models"
	"triptix/services"
	"github.com/gin-gonic/gin"
)

func CreateWisata(c *gin.Context) {
	var wisata models.Wisata
	if err := c.BindJSON(&wisata); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	wisata, err := services.CreateWisata(wisata)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"message": "Wisata created successfully",
		"data":    wisata,
	})
	
}
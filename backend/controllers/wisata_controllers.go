package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"triptix/models"
	"triptix/services"
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

func GetAllWisata(c *gin.Context) {
	wisata, err := services.GetAllWisata()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": wisata,
	})
}

func GetWisataByID(c *gin.Context) {
	id := c.Param("id")
	wisata, err := services.GetWisataByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": wisata,
	})
}

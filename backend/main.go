package main

import (
	"triptix/config"
	"triptix/models"
	"triptix/routes"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	config.ConnectDB()
	config.DB.AutoMigrate(&models.Wisata{}, &models.Foto{}, &models.Review{})

	routes.WisataRoute(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r.Run(":" + port)
}
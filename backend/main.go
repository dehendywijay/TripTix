package main

import (
	"os"
	"triptix/config"
	"triptix/middleware"
	"triptix/models"
	"triptix/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	
	config.ConnectDB()
	config.DB.AutoMigrate(&models.Wisata{}, &models.User{}, &models.Foto{}, &models.Review{})

	routes.WisataRoute(r)
	routes.UserRoute(r)
	routes.ReviewRoute(r)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r.Run(":" + port)
}

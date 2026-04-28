package routes

import (
	"triptix/controllers"

	"github.com/gin-gonic/gin"
)

func WisataRoute(r *gin.Engine) {
	wisata := r.Group("/api/wisata")
	{
		wisata.POST("", controller.CreateWisata)
	}
}
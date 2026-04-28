package routes

import (
	"triptix/controllers"

	"github.com/gin-gonic/gin"
)

func WisataRoute(r *gin.Engine) {
	wisata := r.Group("/api/wisata")
	{
		wisata.POST("", controller.CreateWisata)
		wisata.GET("", controller.GetAllWisata)
		wisata.GET("/:id", controller.GetWisataByID)
	}

}

func UserRoute(r *gin.Engine) {
	user := r.Group("/api/user")
	{
		user.POST("/register", controller.RegisterUser)
		user.POST("/login", controller.LoginUser)
		user.GET("", controller.GetUser)
	}
}

func ReviewRoute(r *gin.Engine) {
	review := r.Group("/api/review")
	{
		review.POST("", controller.CreateReview)
	}
}
package routes

import (
	"triptix/internal/controllers"

	"github.com/gin-gonic/gin"
)

func WisataRoute(r *gin.Engine) {
	wisata := r.Group("/api/wisata")
	{
		wisata.POST("", controller.CreateWisata)
		wisata.GET("", controller.GetAllWisata)
		wisata.GET("/:id", controller.GetWisataByID)
		wisata.PUT("/:id", controller.EditWisata)
	}

}

func UserRoute(r *gin.Engine) {
	user := r.Group("/api/user")
	{
		user.POST("/register", controller.RegisterUser)
		user.POST("/login", controller.LoginUser)
		user.GET("/:email", controller.GetUser)
		user.POST("/logout", controller.LogoutUser)
		user.POST("/refresh", controller.RefreshToken)
	}
}

func ReviewRoute(r *gin.Engine) {
	review := r.Group("/api/reviews")
	{
		review.POST("", controller.CreateReview)
		review.GET("/wisata/:wisata_id", controller.GetReviewsByWisata)
	}
}


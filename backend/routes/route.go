package routes

import (
	controller "triptix/internal/controllers"
	"triptix/internal/repository"
	"triptix/internal/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var db *gorm.DB

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
	authRepo := &repository.AuthRepository{
		GormDB: db,
	}
	authService := services.NewAuthService(authRepo)
	authController := controller.NewAuthControllers(authService)
	user := r.Group("/api/user")
	{
		user.POST("/register", authController.RegisterUser)
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

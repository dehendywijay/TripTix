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
		user.POST("/login", authController.LoginUser)
		user.GET("/:email", authController.GetUser)
		user.POST("/logout", authController.LogoutUser)
		user.POST("/refresh", authController.RefreshToken)
	}
}

func ReviewRoute(r *gin.Engine) {
	reviewRepo := &repository.ReviewRepository{
		GormDB: db,
	}
	reviewService := services.NewReviewService(reviewRepo)
	reviewController := controller.NewReviewControllers(reviewService)
	review := r.Group("/api/reviews")
	{
		review.POST("", reviewController.CreateReview)
		review.GET("/wisata/:wisata_id", reviewController.GetReviewsByWisata)
	}
}

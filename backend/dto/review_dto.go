package dto

type CreateReviewRequest struct {
	UserID   uint   `json:"user_id" binding:"required"`
	WisataID uint   `json:"wisata_id" binding:"required"`
	Rating  int    `json:"rating" binding:"required,min=1,max=5"`
	Comment string `json:"comment" binding:"required"`
}

type ReviewResponse struct {
	ID       uint   `json:"id"`
	UserID   uint   `json:"user_id"`
	WisataID uint   `json:"wisata_id"`
	Rating   int    `json:"rating"`
	Comment  string `json:"comment"`
}
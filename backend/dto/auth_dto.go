package dto

type LoginRespone struct {
	ID    uint  `json:"id"`
	Email string `json:"email"`
	RefreshToken string `json:"refresh_token"`
	AccesToken string `json:"access_token"`
}

type RefreshTokenRequest struct {
	RefreshToken string `json:"refresh_token"`
}
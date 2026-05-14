package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Nama     string `json:"nama" gorm:"not null"`
	Email    string `json:"email" gorm:"not null;unique"`
	Password string `json:"password" gorm:"not null"`

	Reviews []Review `gorm:"foreignKey:UserID"`
	Bookmarks []Bookmark `gorm:"foreignKey:UserID"`
	Orders    []Order `gorm:"foreignKey:UserID"`

	RefreshTokens []RefreshToken `gorm:"foreignKey:UserID"`
}

type RefreshToken struct {
	gorm.Model

	UserID uint `gorm:"not null;index"`
	User   User `gorm:"constraint:OnDelete:CASCADE;"`

	TokenHash string    `gorm:"not null;uniqueIndex"`
	ExpiresAt time.Time `gorm:"not null"`

	Revoked bool `gorm:"default:false"`

	UserAgent string
	IPAddress string
}

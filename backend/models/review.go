package models

import "gorm.io/gorm"

type Review struct {
	gorm.Model
	UserID   uint `json:"user_id" gorm:"not null"`
	WisataID uint `json:"wisata_id" gorm:"not null"`

	Rating  int    `json:"rating" gorm:"not null"`
	Comment string `json:"comment" gorm:"not null"`

	User   User   `json:"user,omitempty" gorm:"foreignKey:UserID"`
	Wisata Wisata `json:"wisata,omitempty" gorm:"foreignKey:WisataID"`
}
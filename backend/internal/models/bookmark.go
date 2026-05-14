package models

import "gorm.io/gorm"

type Bookmark struct {
	gorm.Model
	UserID   uint `json:"user_id" gorm:"not null;uniqueIndex:idx_user_wisata"`
	WisataID uint `json:"wisata_id" gorm:"not null;uniqueIndex:idx_user_wisata"`

	User   User   `json:"user,omitempty" gorm:"foreignKey:UserID"`
	Wisata Wisata `json:"wisata,omitempty" gorm:"foreignKey:WisataID"`
}

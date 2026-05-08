package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Nama     string `json:"nama" gorm:"not null"`
	Email    string `json:"email" gorm:"not null;unique"`
	Password string `json:"password" gorm:"not null"`

	Reviews []Review `gorm:"foreignKey:UserID"`
}
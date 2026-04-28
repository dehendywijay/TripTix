package models 

import "gorm.io/gorm"


type User struct {
	gorm.Model
	Nama     string `json:"nama" gorm:"not null"`
	Email    string `json:"email" gorm:"not null"`
	Password string `json:"password" gorm:"not null"`

	Reviews  []Review `gorm:"foreignKey:UserID"`
}

type Wisata struct {
	gorm.Model
	Nama    string `json:"nama" gorm:"not null"`
	Alamat  string `json:"alamat" gorm:"not null"`
	Foto    string `json:"foto" gorm:"not null"`
	Deskripsi string `json:"deskripsi" gorm:"not null"`
	Durasi int `json:"durasi" gorm:"not null"`
	Jenis string `json:"jenis" gorm:"not null"`
	Harga int `json:"harga" gorm:"not null"`
	Kategori string `json:"kategori" gorm:"not null"`

	Reviews []Review `gorm:"foreignKey:WisataID"`
	Fotos   []Foto   `gorm:"foreignKey:WisataID"`
}

type Review struct {
    gorm.Model
    UserID   uint `json:"user_id" gorm:"not null"`
	WisataID uint `json:"wisata_id" gorm:"not null"`

	Rating  int    `json:"rating" gorm:"not null"`
	Comment string `json:"comment" gorm:"not null"`

	User   User   `json:"user,omitempty" gorm:"foreignKey:UserID"`
	Wisata Wisata `json:"wisata,omitempty" gorm:"foreignKey:WisataID"`
}

type Foto struct {
    gorm.Model
    WisataID uint `json:"wisata_id" gorm:"not null"`
    URL      string `json:"url" gorm:"not null"`
}
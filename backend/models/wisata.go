package models 

import "gorm.io/gorm"

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
    WisataID uint
    Isi      string
    Rating   int
}

type Foto struct {
    gorm.Model
    WisataID uint
    URL      string
}
package dto

type AllWisataResponse struct {
	ID uint `json:"id"`
	Nama string `json:"nama"`
	Alamat string `json:"alamat"`
	Harga int `json:"harga"`
	Kategori string `json:"kategori"`
	Foto string `json:"foto"`
}
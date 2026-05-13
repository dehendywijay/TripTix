package controller

import (
	"net/http"
	"strconv"
	"triptix/models"
	"triptix/services"
	"triptix/storage"
	"triptix/utils"

	"github.com/gin-gonic/gin"
)

func CreateWisata(c *gin.Context) {
	nama := c.PostForm("nama")
	alamat := c.PostForm("alamat")
	deskripsi := c.PostForm("deskripsi")
	durasi := c.PostForm("durasi")
	jenis := c.PostForm("jenis")
	harga := c.PostForm("harga")
	kategori := c.PostForm("kategori")

	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "S"})
		return
	}

	files := form.File["fotos"]
	durasii, _ := strconv.Atoi(durasi)
	hargaa, _ := strconv.Atoi(harga)

	if nama == "" || alamat == "" || deskripsi == "" || durasi == "" || jenis == "" || harga == "" || kategori == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Semua field harus diisi"})
		return
	}
	wisata := models.Wisata{
		Nama:      nama,
		Alamat:    alamat,
		Deskripsi: deskripsi,
		Durasi:    durasii,
		Jenis:     jenis,
		Harga:     hargaa,
		Kategori:  kategori,
	}

	result, err := services.CreateWisata(wisata)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	for _, file := range files {
		fileBytes, objectPath, contentType, err := utils.ProcessImageUpload(file)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		publicURL, err := storage.UploadToSupabase("wisata_image", objectPath, contentType, fileBytes)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		foto := models.Foto{
			WisataID: result.ID,
			URL:      publicURL,
		}
		if err := services.CreateWisataFoto(foto); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Data wisata berhasil dibuat",
		"data":    result,
	})

}

func EditWisata(c *gin.Context) {
	id := c.Param("id")
	idFoto := c.PostForm("id_foto")
	nama := c.PostForm("nama")
	alamat := c.PostForm("alamat")
	deskripsi := c.PostForm("deskripsi")
	durasi := c.PostForm("durasi")
	jenis := c.PostForm("jenis")
	harga := c.PostForm("harga")
	kategori := c.PostForm("kategori")

	// form, err := c.MultipartForm()
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "S"})
	// 	return
	// }

	// files := form.File["fotos"]
	durasii, _ := strconv.Atoi(durasi)
	idd, _ := strconv.Atoi(id)
	hargaa, _ := strconv.Atoi(harga)

	if nama == "" || alamat == "" || deskripsi == "" || durasi == "" || jenis == "" || harga == "" || kategori == "" {

	}

	wisata := models.Wisata{
		Nama:      nama,
		Alamat:    alamat,
		Deskripsi: deskripsi,
		Durasi:    durasii,
		Jenis:     jenis,
		Harga:     hargaa,
		Kategori:  kategori,
	}

	fileEdit, _ := c.FormFile("fotoEdit")
	if fileEdit != nil {
		oldObjectPath, err := services.GetFotoWisata(id, idFoto)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		oldFoto := utils.ExtractObjectPath(oldObjectPath.URL, "wisata_image")
		FileBytes, ObjectPath, contentType, err := utils.ProcessImageUploadUpdate(c, "fotoEdit")
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		publicURL, err := storage.UpdateSupabaseFile("wisata_image", oldFoto, ObjectPath, contentType, FileBytes)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		foto := models.Foto{
			URL:      publicURL,
		}

		
		if err := services.UpdateWisataFoto(foto, idFoto); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

		form, err := c.MultipartForm()
		if err == nil {
		files := form.File["fotos"]

		for _, file := range files {
			fileBytes, objectPath, contentType, err := utils.ProcessImageUpload(file)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}

			publicURL, err := storage.UploadToSupabase("wisata_image", objectPath, contentType, fileBytes)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			foto := models.Foto{
				WisataID: uint(idd),
				URL:      publicURL,
			}
			if err := services.CreateWisataFoto(foto); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}

		}
	}
	
	_ , err = services.EditWisata(id, wisata)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
}

func GetAllWisata(c *gin.Context) {
	wisata, err := services.GetAllWisata()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Gagal mengambil data wisata",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": wisata,
	})
}

func GetWisataByID(c *gin.Context) {
	id := c.Param("id")
	wisata, err := services.GetWisataByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Data wisata tidak ditemukan",
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"data": wisata,
	})
}

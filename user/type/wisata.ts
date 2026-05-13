export type fotos ={
    ID : string
    wisata_id: string
    url: string
}


export type Wisata = {
    ID: string;
    nama: string;
    alamat: string;
    deskripsi: string;
    durasi: number;
    jenis: string;
    harga: number;
    kategori: string;
    foto : string
    Fotos: fotos[]
};


export type Wisata = {
    id: string;
    nama: string;
    alamat: string;
    harga: number;
    kategori: string;
    foto : string
};

export type WisataResponse = {
  id: any;
  data: Wisata[];
};
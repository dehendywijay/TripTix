export interface Destination {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  description: string;
}

export const destinations: Destination[] = [
  {
    id: "1",
    name: "Candi Borobudur",
    location: "Magelang, Jawa Tengah",
    price: 50000,
    rating: 4.8,
    reviews: 1240,
    image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800",
    category: "Budaya",
    description: "Candi Budha terbesar di dunia dan salah satu keajaiban dunia UNESCO.",
  },
  {
    id: "2",
    name: "Pantai Pandawa",
    location: "Badung, Bali",
    price: 15000,
    rating: 4.6,
    reviews: 850,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
    category: "Pantai",
    description: "Pantai pasir putih yang indah yang tersembunyi di balik tebing kapur.",
  },
  {
    id: "3",
    name: "Gunung Bromo",
    location: "Probolinggo, Jawa Timur",
    price: 35000,
    rating: 4.9,
    reviews: 2100,
    image: "https://images.unsplash.com/photo-1603504104085-5b8d2127393d?auto=format&fit=crop&q=80&w=800",
    category: "Gunung",
    description: "Gunung berapi aktif yang menawarkan pemandangan matahari terbit yang spektakuler.",
  },
  {
    id: "4",
    name: "Dufan (Dunia Fantasi)",
    location: "Ancol, Jakarta",
    price: 225000,
    rating: 4.5,
    reviews: 3200,
    image: "https://images.unsplash.com/photo-1513889959010-6ec3f5c6e3a7?auto=format&fit=crop&q=80&w=800",
    category: "Hiburan",
    description: "Taman hiburan terbesar di Jakarta dengan berbagai wahana seru.",
  },
  {
    id: "5",
    name: "Jalan Malioboro",
    location: "Yogyakarta",
    price: 0,
    rating: 4.7,
    reviews: 5000,
    image: "https://images.unsplash.com/photo-1555529902-5261145633bf?auto=format&fit=crop&q=80&w=800",
    category: "Belanja",
    description: "Pusat perbelanjaan ikonik dan wisata malam di jantung kota Jogja.",
  },
  {
    id: "6",
    name: "Museum Fatahillah",
    location: "Kota Tua, Jakarta",
    price: 10000,
    rating: 4.4,
    reviews: 950,
    image: "https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&q=80&w=800",
    category: "Sejarah",
    description: "Museum sejarah Jakarta yang terletak di bekas balai kota Batavia.",
  },
  {
    id: "7",
    name: "Masjid Istiqlal",
    location: "Jakarta Pusat",
    price: 0,
    rating: 4.9,
    reviews: 4200,
    image: "https://images.unsplash.com/photo-1564507004663-b6afb3f6040a?auto=format&fit=crop&q=80&w=800",
    category: "Religi",
    description: "Masjid terbesar di Asia Tenggara dengan arsitektur yang megah.",
  },
  {
    id: "8",
    name: "Taman Safari Indonesia",
    location: "Bogor, Jawa Barat",
    price: 250000,
    rating: 4.8,
    reviews: 2800,
    image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&q=80&w=800",
    category: "Keluarga",
    description: "Kebun binatang interaktif di mana pengunjung dapat melihat hewan dari dekat.",
  },
  {
    id: "9",
    name: "Sate Klathak Pak Pong",
    location: "Bantul, Yogyakarta",
    price: 35000,
    rating: 4.6,
    reviews: 1500,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
    category: "Kuliner",
    description: "Wisata kuliner legendaris dengan sate kambing tusuk jeruji besi.",
  },
  {
    id: "10",
    name: "Curug Lawe",
    location: "Semarang, Jawa Tengah",
    price: 10000,
    rating: 4.7,
    reviews: 620,
    image: "https://images.unsplash.com/photo-1522881113591-b6a672323cc6?auto=format&fit=crop&q=80&w=800",
    category: "Alam",
    description: "Air terjun tersembunyi yang indah di tengah hutan pinus yang sejuk.",
  }
];

export const categories = [
  { id: "1", name: "Semua", icon: "grid" },
  { id: "2", name: "Pantai", icon: "umbrella" },
  { id: "3", name: "Gunung", icon: "mountain" },
  { id: "4", name: "Budaya", icon: "landmark" },
  { id: "5", name: "Hiburan", icon: "ticket" },
  { id: "6", name: "Alam", icon: "treePine" },
  { id: "7", name: "Sejarah", icon: "castle" },
  { id: "8", name: "Belanja", icon: "shoppingBag" },
  { id: "9", name: "Kuliner", icon: "utensils" },
  { id: "10", name: "Religi", icon: "book" },
  { id: "11", name: "Keluarga", icon: "users" },
];

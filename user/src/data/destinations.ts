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
  distance?: string;
  recommended?: boolean;
}

export interface RecentTrip {
  id: string;
  destinationId: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  people: number;
  price: number;
  date: string;
  status: "Completed" | "Upcoming" | "Cancelled";
}

export const destinations: Destination[] = [
  {
    id: "1",
    name: "Candi Borobudur",
    location: "Magelang, Jawa Tengah",
    price: 50000,
    rating: 4.8,
    reviews: 1240,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Pradaksina.jpg/960px-Pradaksina.jpg",
    category: "Budaya",
    description: "Candi Budha terbesar di dunia dan salah satu keajaiban dunia UNESCO. Dibangun pada abad ke-9, Borobudur menawarkan pemandangan yang memukau dengan ratusan stupa dan relief yang menceritakan kisah-kisah ajaran Buddha.",
    distance: "42 km",
    recommended: true,
  },
  {
    id: "2",
    name: "Pantai Pandawa",
    location: "Badung, Bali",
    price: 15000,
    rating: 4.6,
    reviews: 850,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Sunset_At_Pandawa_Beach.jpg/960px-Sunset_At_Pandawa_Beach.jpg",
    category: "Pantai",
    description: "Pantai pasir putih yang indah yang tersembunyi di balik tebing kapur. Dikenal juga sebagai Pantai Rahasia, tempat ini menyuguhkan ketenangan dan keindahan alam Bali yang sesungguhnya.",
    distance: "137 km",
  recommended: true,
  },
  {
    id: "3",
    name: "Gunung Bromo",
    location: "Probolinggo, Jawa Timur",
    price: 35000,
    rating: 4.9,
    reviews: 2100,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Bromo-Semeru-Batok-Widodaren.jpg/960px-Bromo-Semeru-Batok-Widodaren.jpg",
    category: "Gunung",
    description: "Gunung berapi aktif yang menawarkan pemandangan matahari terbit yang spektakuler di atas lautan pasir. Pemandangan kawah yang mengepulkan asap menjadi daya tarik utama yang tidak terlupakan.",
    distance: "95 km",
    recommended: true,
  },
  {
    id: "4",
    name: "Dufan (Dunia Fantasi)",
    location: "Ancol, Jakarta",
    price: 225000,
    rating: 4.5,
    reviews: 3200,
    image: "NO_IMAGE",
    category: "Hiburan",
    description: "Taman hiburan terbesar di Jakarta dengan berbagai wahana seru untuk seluruh keluarga. Nikmati wahana memacu adrenalin hingga pertunjukan spektakuler dalam satu kawasan hiburan terpadu.",
    distance: "12 km",
  },
  {
    id: "5",
    name: "Jalan Malioboro",
    location: "Yogyakarta",
    price: 0,
    rating: 4.7,
    reviews: 5000,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Malioboro_Street%2C_Yogyakarta.JPG/960px-Malioboro_Street%2C_Yogyakarta.JPG",
    category: "Belanja",
    description: "Pusat perbelanjaan ikonik dan wisata malam di jantung kota Jogja. Temukan berbagai kerajinan tangan, batik, dan kuliner khas Yogyakarta di sepanjang jalan yang penuh sejarah ini.",
    distance: "560 km",
  },
  {
    id: "6",
    name: "Museum Fatahillah",
    location: "Kota Tua, Jakarta",
    price: 10000,
    rating: 4.4,
    reviews: 950,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Batavia_City_Hall_%28Jakarta_History_Museum%29_Fatahillah_Square_%282025%29_-_img_02.jpg/960px-Batavia_City_Hall_%28Jakarta_History_Museum%29_Fatahillah_Square_%282025%29_-_img_02.jpg",
    category: "Sejarah",
    description: "Museum sejarah Jakarta yang terletak di bekas balai kota Batavia. Jelajahi koleksi artefak bersejarah dan arsitektur kolonial yang megah di kawasan Kota Tua.",
    distance: "8 km",
  },
  {
    id: "7",
    name: "Masjid Istiqlal",
    location: "Jakarta Pusat",
    price: 0,
    rating: 4.9,
    reviews: 4200,
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/25/Masjid_Istiqlal_-_Panoramio.jpg/960px-Masjid_Istiqlal_-_Panoramio.jpg",
    category: "Religi",
    description: "Masjid terbesar di Asia Tenggara dengan arsitektur yang megah dan menakjubkan. Kapasitas hingga 200.000 jemaah menjadikannya landmark religi paling penting di Indonesia.",
    distance: "5 km",
    recommended: true,
  },
  {
    id: "8",
    name: "Taman Safari Indonesia",
    location: "Bogor, Jawa Barat",
    price: 250000,
    rating: 4.8,
    reviews: 2800,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Taman_Safari_Indonesia.JPG/960px-Taman_Safari_Indonesia.JPG",
    category: "Keluarga",
    description: "Kebun binatang interaktif di mana pengunjung dapat melihat hewan dari dekat dalam habitat alaminya. Pengalaman safari yang menyenangkan untuk seluruh anggota keluarga.",
    distance: "60 km",
  },
  {
    id: "9",
    name: "Sate Klathak Pak Pong",
    location: "Bantul, Yogyakarta",
    price: 35000,
    rating: 4.6,
    reviews: 1500,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sate_klatak_20170818_Yogyakarta.jpg/960px-Sate_klatak_20170818_Yogyakarta.jpg",
    category: "Kuliner",
    description: "Wisata kuliner legendaris dengan sate kambing tusuk jeruji besi yang khas dan unik. Cita rasa autentik Jogja yang telah diwariskan turun-temurun sejak puluhan tahun.",
    distance: "570 km",
  },
  {
    id: "10",
    name: "Curug Lawe",
    location: "Semarang, Jawa Tengah",
    price: 10000,
    rating: 4.7,
    reviews: 620,
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Locator_kabupaten_semarang.png",
    category: "Alam",
    description: "Air terjun tersembunyi yang indah di tengah hutan pinus yang sejuk dan asri. Perjalanan trekking menuju air terjun ini menawarkan pengalaman alam yang tak terlupakan.",
    distance: "450 km",
  },
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

export const recentTrips: RecentTrip[] = [
  {
    id: "rt1",
    destinationId: "1",
    name: "Candi Borobudur",
    location: "Magelang, Jawa Tengah",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Pradaksina.jpg/960px-Pradaksina.jpg",
    rating: 4.8,
    people: 2,
    price: 100000,
    date: "12 Apr 2025",
    status: "Completed",
  },
  {
    id: "rt2",
    destinationId: "3",
    name: "Gunung Bromo",
    location: "Probolinggo, Jawa Timur",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Bromo-Semeru-Batok-Widodaren.jpg/960px-Bromo-Semeru-Batok-Widodaren.jpg",
    rating: 4.9,
    people: 3,
    price: 105000,
    date: "20 Mar 2025",
    status: "Completed",
  },
];

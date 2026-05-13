import { api_wisata } from "@/constans/strings";
import { Wisata } from "@/type/wisata";
import axios from "axios";
import { useEffect, useState } from "react";

export const useAlumni = () => {
  const [wisata, setAlumni] = useState<Wisata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fecthWisata = async () => {
    try {
      const data = await axios.get<Wisata[]>(`${api_wisata}`).then((res) => res.data);
      setAlumni(data);
    } catch (error) {
      console.error(error);
      setError("Gagal Mengambil Data Wisata.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fecthWisata();
  }, []);

  return { wisata, loading, error, refetch: fecthWisata };
};

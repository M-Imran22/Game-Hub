import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Genre {
  id: number;
  genreName: string;
}

const useGenre = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    const fetchGames = async () => {
      try {
        const response = await apiClient.get<Genre[]>("/genres", {
          signal: controller.signal,
        });
        setGenres(response.data);
        setLoading(false);
      } catch (error) {
        if (error instanceof CanceledError) return;
        setError("Error fetching games");
        setLoading(false);
      }
    };
    fetchGames();

    return () => {
      controller.abort();
    };
  }, []);
  return { genres, error, isLoading };
};

export default useGenre;

import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform {
  id: number;
  slug: string;
}

export interface Game {
  id: number;
  gameName: string;
  gameImage: string;
  platform: Platform[];
}
const useGame = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    const fetchGames = async () => {
      try {
        const response = await apiClient.get<Game[]>("/games", {
          signal: controller.signal,
        });
        setGames(response.data);
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
  return { games, error, isLoading };
};
export default useGame;

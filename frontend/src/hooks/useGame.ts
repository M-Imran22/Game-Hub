import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

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

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await apiClient.get<Game[]>("/games");
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games", error);
      }
    };
    fetchGames();
  }, []);
  return { games };
};
export default useGame;

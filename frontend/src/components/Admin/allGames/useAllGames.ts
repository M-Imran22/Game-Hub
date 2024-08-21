// useGames.ts
import { useQuery } from "@tanstack/react-query";
import axios from "../../../services/axios";

interface GameProduct {
  id: number;
  gameName: string;
  gameImage: string;
  publisherName: string;
  price: number;
  releaseDate: string;
}

interface ResponseGames {
  games: GameProduct[];
}

const fetchGames = async (page: number): Promise<GameProduct[]> => {
  const response = await axios.get<ResponseGames>("/games", {
    params: {
      page: page,
      page_size: 10,
    },
  });
  return response.data.games;
};

const useAllGames = (page: number) => {
  return useQuery<GameProduct[], Error>({
    queryKey: ["games", page],
    queryFn: () => fetchGames(page),
    // staleTime: Infinity,
  });
};

export default useAllGames;

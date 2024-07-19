import { useQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import { Genre } from "./useGenre";
import { Platform } from "./usePlatforms";
import ApiClient from "../services/api-client";

const apiClient = new ApiClient<Game>("games");

export interface Game {
  id: number;
  gameName: string;
  gameImage: string;
  platform: Platform[];
  genre: Genre[];
  search: string;
}
const useGame = (gameQuery: GameQuery) => {
  const {
    data: games,
    error,
    isLoading,
  } = useQuery<Game[], Error>({
    queryKey: ["games", gameQuery],
    queryFn: () =>
      apiClient.getAll({
        params: {
          genre: gameQuery.genre?.slug,
          platform: gameQuery.platform?.slug,
          search: gameQuery.onSearch,
        },
      }),
  });

  const filteredGames = games?.filter((game) => {
    const matchesGenre = gameQuery.genre
      ? game.genre.some(
          (genre) => genre.genreName === gameQuery.genre?.genreName
        )
      : true;
    const matchesPlatform = gameQuery.platform
      ? game.platform.some(
          (platform) => platform.slug === gameQuery.platform?.slug
        )
      : true;
    return matchesGenre && matchesPlatform;
  });

  return { games: filteredGames, error, isLoading };
};
export default useGame;

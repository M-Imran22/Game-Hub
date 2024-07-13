import { GameQuery } from "../App";
import useData from "./useData";
import { Genre } from "./useGenre";
import { Platform } from "./usePlatforms";

export interface Game {
  id: number;
  gameName: string;
  gameImage: string;
  platform: Platform[];
  genre: Genre[];
}
const useGame = (gameQuery: GameQuery) => {
  const {
    data: games,
    error,
    isLoading,
  } = useData<Game>(
    "/games",
    {
      params: {
        genre: gameQuery.genre?.slug,
        platform: gameQuery.platform?.slug,
      },
    },
    [gameQuery]
  );
  const filteredGames = games.filter((game) => {
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

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
const useGame = (selectedGenre: Genre | null) => {
  const {
    data: games,
    error,
    isLoading,
  } = useData<Game>(
    "/games",
    { params: selectedGenre ? { genre: selectedGenre.slug } : {} },
    [selectedGenre?.id]
  );
  const filteredGames = selectedGenre
    ? games.filter((game) =>
        game.genre.some((genre) => genre.genreName === selectedGenre.genreName)
      )
    : games;

  return { games: filteredGames, error, isLoading };
};
export default useGame;

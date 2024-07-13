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
const useGame = (
  selectedGenre: Genre | null,
  selectedPlatform: Platform | null
) => {
  const {
    data: games,
    error,
    isLoading,
  } = useData<Game>(
    "/games",
    {
      params: { genre: selectedGenre?.slug, platform: selectedPlatform?.slug },
    },
    [selectedGenre?.id, selectedPlatform?.id]
  );
  const filteredGames = games.filter((game) => {
    const matchesGenre = selectedGenre
      ? game.genre.some((genre) => genre.genreName === selectedGenre.genreName)
      : true;
    const matchesPlatform = selectedPlatform
      ? game.platform.some(
          (platform) => platform.slug === selectedPlatform.slug
        )
      : true;
    return matchesGenre && matchesPlatform;
  });

  return { games: filteredGames, error, isLoading };
};
export default useGame;

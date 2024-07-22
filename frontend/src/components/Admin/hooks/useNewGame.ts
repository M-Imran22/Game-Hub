import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GameData } from "../NewGame";
import genres from "../../data/genres";
import { CACHE_KEY_GAMES } from "../Constants";
import axios from "axios";

const useNewGame = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: GameData) => {
      const gameData = new FormData(); //FormData is a built-in object
      gameData.append("gameName", data.gameName);
      gameData.append("gameImage", data.gameImage[0]);
      gameData.append("platform", JSON.stringify(data.platform));

      const selectedGenres = genres.filter((genre) =>
        data.genre.includes(genre.slug)
      );
      gameData.append("genre", JSON.stringify(selectedGenres));

      const response = await axios.post(
        "http://localhost:3001/api/games",
        gameData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },
    onMutate: async (newGame: GameData) => {
      const previousGames =
        queryClient.getQueryData<GameData[]>(CACHE_KEY_GAMES) || [];

      queryClient.setQueryData<GameData[]>(CACHE_KEY_GAMES, (old) => [
        ...old!,
        newGame,
      ]);

      return { previousGames };
    },

    onSuccess: () => {
      onAdd();
    },
    onError: (_error, _newGame, context) => {
      if (context?.previousGames) {
        queryClient.setQueryData<GameData[]>(
          CACHE_KEY_GAMES,
          context.previousGames
        );
      }
    },
  });
};

export default useNewGame;

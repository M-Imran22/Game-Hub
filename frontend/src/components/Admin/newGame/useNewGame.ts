import { useMutation } from "@tanstack/react-query";
import genres from "../../../data/genres";
import { GameData } from "./NewGameValidationSchema";
import { axiosPrivate } from "../../../services/axios";
import ApiClient from "../../../services/api-client";

const useNewGame = (onAdd: () => void) => {
  const apiClient = new ApiClient<GameData>("games", axiosPrivate);
  return useMutation({
    mutationFn: async (data: GameData) => {
      const gameData = new FormData(); //FormData is a built-in object
      gameData.append("gameName", data.gameName);
      gameData.append("gameImage", data.gameImage[0]);
      gameData.append("platform", JSON.stringify(data.platform));
      gameData.append("publisherName", data.publisherName);
      gameData.append("releaseDate", data.releaseDate);
      gameData.append("price", data.price.toString());
      gameData.append("salePrice", (data.salePrice ?? 0).toString());
      gameData.append("gameDescription", data.gameDescription);

      data.screenshots.forEach((screenShot) => {
        gameData.append("screenshots", screenShot);
      });

      const selectedGenres = genres.filter((genre) =>
        data.genre.includes(genre.slug)
      );
      gameData.append("genre", JSON.stringify(selectedGenres));

      const response = await apiClient.postNewGame(gameData);

      return response.data;
    },

    onSuccess: () => {
      console.log("Data is submited into db");
      onAdd();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};

export default useNewGame;

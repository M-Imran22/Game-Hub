import { useMutation } from "@tanstack/react-query";
import genres from "../data/genres";
import axios from "axios";
import { GameData } from "../components/Admin/newGame/NewGameValidationSchema";

const useNewGame = (onAdd: () => void) => {
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
      gameData.append("gameDescription", data.gameDiscription);

      data.screenShots.forEach((screenShot) => {
        gameData.append("screenShots", screenShot);
      });

      const selectedGenres = genres.filter((genre) =>
        data.genre.includes(genre.slug)
      );
      gameData.append("genre", JSON.stringify(selectedGenres));

      // console.log(gameData);
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

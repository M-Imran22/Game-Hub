import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "../../../services/axios";
import { GameData } from "../newGame/NewGameValidationSchema";
import genres from "../../../data/genres";
import ScreenShots from "../../../entities/ScreenShots";

const fetchGame = async (id: string) => {
  const response = await axios.get(`/game/${id}/edit`);
  return response.data;
};

const useEditGame = (id: string | undefined, onSuccess: () => void) => {
  const {
    data: game,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["game", id],
    queryFn: () => fetchGame(id!),
    enabled: !!id, // Only fetch if id is available
  });

  const mutation = useMutation({
    mutationFn: async (data: GameData) => {
      const gameData = new FormData(); // FormData object

      // Always append game name
      gameData.append("gameName", data.gameName);

      // Append game image
      if (data.gameImage.length > 0) {
        gameData.append("gameImage", data.gameImage[0]); // New image
      } else if (game?.gameImage) {
        gameData.append("gameImage", game.gameImage); // Old image
      }

      // Append platform (always append, even if unchanged)
      gameData.append("platform", JSON.stringify(data.platform));

      // Always append publisher name
      gameData.append("publisherName", data.publisherName);

      // Always append release date
      gameData.append("releaseDate", data.releaseDate);

      // Always append price
      gameData.append("price", data.price.toString());

      // Always append sale price
      gameData.append("salePrice", (data.salePrice ?? 0).toString());

      // Always append game description
      gameData.append("gameDescription", data.gameDescription);

      // Append screenshots (if new ones are uploaded)
      if (data.screenshots.length > 0) {
        data.screenshots.forEach((screenshot) => {
          gameData.append("screenshots", screenshot);
        });
      } else if (game?.screenshots) {
        game.screenshots.forEach((screenshot: ScreenShots) => {
          gameData.append("screenshots", screenshot.screenShot); // Old screenshots
        });
      }

      // Append genres (always append, even if unchanged)
      const selectedGenres = genres.filter((genre) =>
        data.genre.includes(genre.slug)
      );
      gameData.append("genre", JSON.stringify(selectedGenres));

      // Send the updated form data to the server
      const response = await axios.put(`/game/${id}/edit`, gameData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onSuccess: () => {
      console.log("Game updated successfully");
      onSuccess();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return { game, isLoading, isError, mutation };
};

export default useEditGame;

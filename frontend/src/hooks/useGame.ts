import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Game } from "../entities/Game";

const apiClient = new ApiClient<Game>("/game");

const useGame = (gameName: string) =>
  useQuery({
    queryKey: ["game", gameName],
    queryFn: () => apiClient.get(gameName),
  });

export default useGame;

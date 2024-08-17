import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import Game from "../entities/Game";
import useAxiosPrivate from "./useAxiosPrivate";

const useGame = (gameName: string) => {
  const axiosPrivate = useAxiosPrivate();

  const apiClient = new ApiClient<Game>("/game", axiosPrivate);
  return useQuery({
    queryKey: ["game", gameName],
    queryFn: () => apiClient.get(gameName),
  });
};

export default useGame;

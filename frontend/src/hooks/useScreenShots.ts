import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import ScreenShots from "../entities/ScreenShots";

const useScreenShots = (gameId: number) => {
  const apiClient = new ApiClient<ScreenShots[]>(`/game/gameScreenShots/`);
  return useQuery({
    queryKey: ["screenshots", gameId],
    queryFn: () => apiClient.get(gameId),
  });
};
export default useScreenShots;

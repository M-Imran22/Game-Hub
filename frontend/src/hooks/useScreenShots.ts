import { useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import ScreenShots from "../entities/ScreenShots";
import useAxiosPrivate from "./useAxiosPrivate";

const useScreenShots = (gameId: number) => {
  const axiosPrivate = useAxiosPrivate();
  const apiClient = new ApiClient<ScreenShots[]>(
    `/game/gameScreenShots`,
    axiosPrivate
  );
  return useQuery({
    queryKey: ["screenshots", gameId],
    queryFn: () => apiClient.get(gameId),
  });
};
export default useScreenShots;

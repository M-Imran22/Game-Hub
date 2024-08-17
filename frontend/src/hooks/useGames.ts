import { useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import ApiClient from "../services/api-client";
import useGameQueryStore from "../store/gameQueryStore";
import Game from "../entities/Game";
import useAxiosPrivate from "./useAxiosPrivate";

const useGames = () => {
  const axiosPrivate = useAxiosPrivate();

  const apiClient = new ApiClient<Game>("games", axiosPrivate);
  const gameQuery = useGameQueryStore((s) => s.gameQuery);
  return useInfiniteQuery<
    { games: Game[]; total: number; pages: number; currentPage: number },
    Error
  >({
    queryKey: ["games", gameQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAllPaginated({
        params: {
          genre: gameQuery.genre?.slug,
          platform: gameQuery.platform?.slug,
          search: gameQuery.searchText,
          page: pageParam,
          limit: 6,
        },
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.pages
        ? lastPage.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
    // staleTime: 24 * 60 * 60 * 1000, // 24h
    staleTime: ms("1d"),
  });
};
export default useGames;

import { useInfiniteQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import { Genre } from "./useGenre";
import { Platform } from "./usePlatforms";
import ApiClient from "../services/api-client";
import ms from "ms";

const apiClient = new ApiClient<Game>("games");

export interface Game {
  id: number;
  gameName: string;
  gameImage: string;
  platform: Platform[];
  genre: Genre[];
  search: string;
}

const useGame = (gameQuery: GameQuery) =>
  useInfiniteQuery<
    { games: Game[]; total: number; pages: number; currentPage: number },
    Error
  >({
    queryKey: ["games", gameQuery],
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAllPaginated({
        params: {
          genre: gameQuery.genre?.slug,
          platform: gameQuery.platform?.slug,
          search: gameQuery.onSearch,
          page: pageParam,
          limit: 5,
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

export default useGame;

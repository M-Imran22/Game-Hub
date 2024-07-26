import { useQuery } from "@tanstack/react-query";
import genres from "../data/genres";
import ms from "ms";
import ApiClient from "../services/api-client";

const apiClient = new ApiClient<Genre>("genres");

export interface Genre {
  id: number;
  genreName: string;
  slug: string;
}

const useGenre = () =>
  useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,

    staleTime: ms("1d"),
    initialData: genres,
  });

export default useGenre;

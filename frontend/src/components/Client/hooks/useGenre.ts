import { useQuery } from "@tanstack/react-query";
import genres from "../../data/genres";
import ApiClient from "../services/api-client";
import ms from "ms";

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

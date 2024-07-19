import { useQuery } from "@tanstack/react-query";
import genres from "../data/genres";
import ApiClient from "../services/api-client";

const apiClient = new ApiClient<Genre>("genres");

export interface Genre {
  id: number;
  genreName: string;
  slug: string;
}

const useGenre = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: apiClient.getAll,

    staleTime: 24 * 60 * 60 * 1000,
    initialData: genres,
  });

export default useGenre;

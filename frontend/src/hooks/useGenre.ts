import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import genres from "../data/genres";

export interface Genre {
  id: number;
  genreName: string;
  slug: string;
}

// const useGenre = () => ({ genres, error: null, isLoading: false });
const useGenre = () =>
  useQuery({
    queryKey: ["genres"],
    queryFn: () => apiClient.get<Genre[]>("genres").then((res) => res.data),

    staleTime: 24 * 60 * 60 * 1000,
    initialData: genres,
  });

export default useGenre;

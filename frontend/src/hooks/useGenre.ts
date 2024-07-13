import genres from "../data/genres";

export interface Genre {
  id: number;
  genreName: string;
  slug: string;
}

const useGenre = () => ({ genres, error: null, isLoading: false });

export default useGenre;

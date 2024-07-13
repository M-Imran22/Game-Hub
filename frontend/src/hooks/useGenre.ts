import useData from "./useData";

export interface Genre {
  id: number;
  genreName: string;
  slug: string;
  gameID: number;
}

const useGenre = () => {
  const { data: genres, error, isLoading } = useData<Genre>("/genres");
  return { genres, error, isLoading };
};

export default useGenre;

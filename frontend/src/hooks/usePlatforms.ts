import useData from "./useData";

export interface Platform {
  id: number;
  slug: string;
}

const usePlatforms = () => {
  const { data: platforms, error, isLoading } = useData<Platform>("/platforms");
  return { platforms, error, isLoading };
};

export default usePlatforms;

import platforms from "../data/platforms";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

const usePlatforms = () => ({ platforms, error: null, isLoading: false });

export default usePlatforms;

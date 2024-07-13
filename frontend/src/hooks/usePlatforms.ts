import platforms from "../data/platforms";
import useData from "./useData";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

const usePlatforms = () => ({ platforms, error: null, isLoading: false });
//    {
//   const { data: platforms, error, isLoading } = useData<Platform>("/platforms");
//   return { platforms, error, isLoading };
// };

export default usePlatforms;

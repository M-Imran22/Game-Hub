import { Genre } from "./useGenre";
import { Platform } from "./usePlatforms";

export interface Game {
  id: number;
  gameName: string;
  gameImage: string;
  gameDescription: string;
  platform: Platform[];
  genre: Genre[];
  search: string;
}

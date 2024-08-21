import Genre from "./Genre";
import Platform from "./Platform";

export default interface Game {
  id: number;
  gameName: string;
  gameImage: string;
  gameDescription: string;
  publisherName: string;
  platforms: Platform[];
  genres: Genre[];
  search: string;
}

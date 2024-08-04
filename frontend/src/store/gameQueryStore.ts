import { create } from "zustand";
import Genre from "../entities/Genre";
import Platform from "../entities/Platform";

interface GameQuery {
  genre?: Genre | null;
  platform?: Platform | null;
  searchText?: string;
}

interface GameQueryStore {
  gameQuery: GameQuery;
  setGenre: (genre: Genre) => void;
  setPlatform: (platform: Platform) => void;
  setSearchText: (searchText: string) => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
  gameQuery: {},
  setGenre: (genre) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, genre } })),
  setPlatform: (platform) =>
    set((store) => ({ gameQuery: { ...store.gameQuery, platform } })),
  setSearchText: (searchText) => set(() => ({ gameQuery: { searchText } })),
}));

export default useGameQueryStore;

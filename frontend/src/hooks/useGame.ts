import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import useData from "./useData";

export interface Platform {
  id: number;
  slug: string;
}

export interface Game {
  id: number;
  gameName: string;
  gameImage: string;
  platform: Platform[];
}
const useGame = () => {
  const { data: games, error, isLoading } = useData<Game>("/games");
  return { games, error, isLoading };
};
export default useGame;

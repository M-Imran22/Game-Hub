import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import useData from "./useData";

interface Genre {
  id: number;
  genreName: string;
}

const useGenre = () => {
  const { data: genres, error, isLoading } = useData<Genre>("/genres");
  return { genres, error, isLoading };
};

export default useGenre;

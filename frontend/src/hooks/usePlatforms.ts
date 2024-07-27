import { useQuery } from "@tanstack/react-query";
import platforms from "../data/platforms";
import ms from "ms";
import ApiClient from "../services/api-client";
import { Platform } from "../entities/Platform";

const apiClient = new ApiClient<Platform>("platforms");

const usePlatforms = () =>
  useQuery({
    queryKey: ["platforms"],
    queryFn: apiClient.getAll,

    staleTime: ms("1d"), //24h
    initialData: platforms,
  });

export default usePlatforms;

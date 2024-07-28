import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import ApiClient from "../services/api-client";

// Define the expected response type for deletion
interface DeleteResponse {
  message: string;
}

const useDeleteGame = (): UseMutationResult<DeleteResponse, Error, number> => {
  const apiClient = new ApiClient<DeleteResponse>("/game");

  const queryClient = useQueryClient();
  return useMutation<DeleteResponse, Error, number>({
    mutationFn: (id: number) => apiClient.delete(id),
    onSuccess: () => {
      // Invalidate and refetch the `games` query
      queryClient.invalidateQueries({
        queryKey: ["games"],
      });
    },
  });
};

export default useDeleteGame;

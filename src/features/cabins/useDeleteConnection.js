import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteConnection as deleteConnectionApi } from "../../services/apiConnections";

export function useDeleteConnection() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteConnection } = useMutation({
    mutationFn: deleteConnectionApi,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");

      queryClient.invalidateQueries({
        queryKey: ["connections"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteConnection };
}

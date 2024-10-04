import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createNConnection } from "../../services/apiConnections";

export function useCreateConnection() {
  const queryClient = useQueryClient();

  const { mutate: createConnection, isLoading: isCreating } = useMutation({
    mutationFn: createNConnection,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["connections"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createConnection };
}

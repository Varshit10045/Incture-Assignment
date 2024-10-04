import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditConnection } from "../../services/apiConnections";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

export function useEditConnection() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  useSearchParams()
  const { mutate: editConnection, isLoading: isEditing } = useMutation({
    mutationFn: createEditConnection,
    onSuccess: (data) => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["connections", page] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editConnection };
}

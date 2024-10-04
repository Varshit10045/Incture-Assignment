import { useQuery } from "@tanstack/react-query";
import { getConnections } from "../../services/apiConnections";

export function useConnection() {
  const {
    isLoading,
    data: connections,
    error,
  } = useQuery({
    queryKey: ["usersC"],
    queryFn: getConnections,
  });

  return { isLoading, error, connections };
}

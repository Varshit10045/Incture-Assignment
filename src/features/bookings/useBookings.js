import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams(); 

  const from = searchParams.get("from")
  const to = searchParams.get("to")

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  // SEARCH
  const search = !searchParams.get("search") ? false : Number(searchParams.get("search"))
  // QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["connections", page, from, to, search],
    queryFn: () => getBookings({ page, from, to, search }),
    onSuccess: () => {
      // searchParams.delete("from");
      // searchParams.delete("to");
      // setSearchParams(searchParams);
    }
   
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["connections", page + 1, from, to],
      queryFn: () => getBookings({ page: page + 1, from, to }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["connections", page - 1],
      queryFn: () => getBookings({ page: page - 1, from, to }),
    });

  return { isLoading, error, bookings, count, page };
}

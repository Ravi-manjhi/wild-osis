import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/consents";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParam] = useSearchParams();
  const filterValue = searchParam.get("status");
  const sortByRaw = searchParam.get("sortBy") || "startDate-desc";

  // filtering
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // sorting
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // Pagination
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;

  // Query
  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  if (error) {
    console.log(error);
    toast.error("No Bookings Found");
  }

  // Pre-Fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { bookings, isLoading, count };
}

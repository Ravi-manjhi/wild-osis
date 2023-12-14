import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export default function useRecentStayBooking() {
  const [searchParam] = useSearchParams();

  const numDays = !searchParam.get("last")
    ? 7
    : Number(searchParam.get("last"));

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: stays, isLoading } = useQuery({
    queryKey: ["stay", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  return { stays, isLoading, numDays };
}

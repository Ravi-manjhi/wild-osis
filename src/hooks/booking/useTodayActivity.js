import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export default function useTodayActivity() {
  const { data, isLoading } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["todayActivity"],
  });

  return { data, isLoading };
}

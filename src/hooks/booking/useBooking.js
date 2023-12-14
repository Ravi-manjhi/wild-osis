import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getBooking } from "../../services/apiBookings";

export default function useBooking() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id),
    retry: false,
  });

  if (error) {
    console.log(error);
    toast.error(error.message);
  }

  return { data, isLoading, error };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteMutate, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => {
      return deleteBooking(id);
    },
    onSuccess: () => {
      toast.success(`Booking is remove Successful`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (error) => {
      console.log(error.message);
      toast.error("Something wrong to Perform this task");
    },
  });

  return { deleteMutate, isDeleting };
}

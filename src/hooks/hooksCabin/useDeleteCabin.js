import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Delete successful");

      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { isLoading, mutate };
}

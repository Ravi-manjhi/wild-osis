import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: userUpdateFn, isLoading: isUpdatingUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
      toast.success("Update Successful");
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  return { userUpdateFn, isUpdatingUser };
}

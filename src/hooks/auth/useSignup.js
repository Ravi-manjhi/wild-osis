import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: createUser,

    onSuccess: (data) => {
      console.log(data);
      toast.success(
        `${data?.fullName} your account created! Please verify throw you're email address `
      );
    },

    onError: () => toast.error("Something wrong with create new user"),
  });

  return { signup, isLoading };
}

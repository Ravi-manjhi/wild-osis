import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: loginFunction, isLoading: isLogin } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/");
    },
    onError: (error) => {
      console.log("ERROR", error);
      toast.error("Provided Email or Password Incorrect");
    },
  });

  return { loginFunction, isLogin };
}

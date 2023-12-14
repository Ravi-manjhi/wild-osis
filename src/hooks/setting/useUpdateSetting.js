import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,

    onSuccess: () => {
      toast.success("Cabin Setting Updated!");
      queryClient.invalidateQueries({
        queryKey: ["setting"],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
}

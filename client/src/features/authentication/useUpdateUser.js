import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "../../hooks/useApiMutation";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateUser } = useApiMutation({
    fn: updateCurrentUser,
    key: ["user"],
    successMsg: "Cập nhật thông tin thành công!",
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
    },
  });

  return { updateUser, isUpdating };
}

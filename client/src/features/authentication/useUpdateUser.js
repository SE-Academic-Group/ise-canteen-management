import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("Cập nhật thông tin thành công");
      queryClient.setQueryData(["user"], user);
    },
    onError: () => toast.error("Có lỗi xảy ra, vui lòng thử lại."),
  });

  return { updateUser, isUpdating };
}

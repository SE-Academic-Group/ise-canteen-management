import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updatePassword as updatePasswordApi } from "../../services/apiAuth";

export function useUpdatePassword() {
  const { mutate: updatePassword, isLoading: isUpdating } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      toast.success("Cập nhật mật khẩu thành công thành công");
    },
    onError: (err) => {
      const errMsg = err?.response?.data?.message;
      toast.error(errMsg || "Có lỗi xảy ra, vui lòng thử lại.");
    },
  });

  return { updatePassword, isUpdating };
}

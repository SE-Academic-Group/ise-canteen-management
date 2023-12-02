import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Đăng xuất thành công");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    },
  });

  return { logout, isLoading };
}

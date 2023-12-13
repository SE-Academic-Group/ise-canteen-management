import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useApiMutation } from "../../hooks/useApiMutation";
import { logout as logoutApi } from "../../services/apiAuth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useApiMutation({
    fn: logoutApi,
    successMsg: "Đã đăng xuất ra khỏi hệ thống.",
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { logout, isLoading };
}

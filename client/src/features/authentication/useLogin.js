import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUser } from "./useUser";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { storeUser } = useUser();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      toast.success("Đăng nhập thành công");
      storeUser(data?.user);
      queryClient.setQueryData(["user"], data);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error("Vui lòng kiểm tra lại email hoặc mật khẩu");
    },
  });

  return { login, isLoading };
}

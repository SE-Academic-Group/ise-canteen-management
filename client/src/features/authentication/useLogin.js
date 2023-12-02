import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      const errMsg = err?.response?.data?.message;
      toast.error(errMsg || "Có lỗi xảy ra, vui lòng thử lại.");
    },
  });

  return { login, isLoading };
}

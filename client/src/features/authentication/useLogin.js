import { useNavigate } from "react-router-dom";
import { useApiMutation } from "../../hooks/useApiMutation";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useApiMutation({
    fn: loginApi,
    successMsg: "Đăng nhập thành công!",
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  return { login, isLoading };
}

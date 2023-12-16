import { useNavigate } from "react-router-dom";
import { useApiMutation } from "../../hooks/useApiMutation";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useApiMutation({
    fn: signupApi,
    successMsg: "Đăng ký thành công!",
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  return { signup, isLoading };
}

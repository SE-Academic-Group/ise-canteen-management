import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { deactivateAccount as deactivateAccountApi } from "../../services/apiAuth";

export function useDeactivateAccount() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isDeactivating, mutate: deactivateAccount } =
    useApiMutation({
      fn: deactivateAccountApi,
      key: QUERY_KEYS.USER,
      successMsg: "Bạn đã tạm khóa tài khoản của mình!",
      onSuccess: () => {
        queryClient.removeQueries();
        navigate("/login", { replace: true });
      },
    });

  return { deactivateAccount, isDeactivating };
}

import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { createDeposit as createDepositApi } from "../../services/apiDeposit";

export function useVnPayDeposit() {
  const { mutate: createDeposit, isLoading: isCreating } = useApiMutation({
    fn: createDepositApi,
    key: [QUERY_KEYS.USER],
    successMsg: "Điều hướng đến trang nạp tiền!",
  });

  return { createDeposit, isCreating };
}

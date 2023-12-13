import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { createDeposit as createDepositApi } from "../../services/apiDeposit";

export function useDeposit() {
  const { mutate: createDeposit, isLoading: isCreating } = useApiMutation({
    fn: createDepositApi,
    key: [QUERY_KEYS.USERS],
    successMsg: "Nạp tiền vào tài khoản thành công!",
  });

  return { createDeposit, isCreating };
}

import { createDeposit as createDepositApi } from "../../services/apiDeposit";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeposit() {
  const { mutate: createDeposit, isLoading: isCreating } = useMutation({
    mutationFn: createDepositApi,
    onSuccess: () => {
      toast.success("Nạp tiền vào tài khoản thành công!");
    },
    onError: (err) => toast.error(err.message ?? "Có lỗi xảy ra!"),
  });

  return { createDeposit, isCreating };
}

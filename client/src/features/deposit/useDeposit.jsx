import { createDeposit as createDepositApi } from "../../services/apiDeposit";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeposit() {
  const { mutate: createDeposit, isLoading: isCreating } = useMutation({
    mutationFn: (data) => {
      toast.promise(createDepositApi(data), {
        loading: "Đang nạp tiền...",
        success: "Nạp tiền vào tài khoản thành công!",
        error: "Có lỗi xảy ra!",
      });
    },
    // onSuccess: () => {
    //   toast.success("Nạp tiền vào tài khoản thành công!");
    // },
    // onError: (err) => toast.error(err.message ?? "Có lỗi xảy ra!"),
  });

  return { createDeposit, isCreating };
}

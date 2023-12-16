import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { createOrder as createOrderApi } from "../../services/apiOrders";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createOrder } = useApiMutation({
    fn: createOrderApi,
    key: [QUERY_KEYS.ORDERS],
    successMsg: "Đơn hàng đã được tạo!",
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.TODAY_MENU);
    },
  });

  return { isCreating, createOrder };
}

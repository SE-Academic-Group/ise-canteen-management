import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { createOrder as createOrderApi } from "../../services/apiOrders";

export function useCreateOrder() {
  const { isLoading: isCreating, mutate: createOrder } = useApiMutation({
    fn: createOrderApi,
    key: [QUERY_KEYS.ORDERS],
    successMsg: "Đơn hàng đã được tạo!",
  });

  return { isCreating, createOrder };
}

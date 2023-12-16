import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "../../hooks/useApiMutation";
import { QUERY_KEYS } from "../../constants/keys";
import { updateOrder } from "../../services/apiOrders";

/**
 *
 * @param {('completed'|'cancelled'|'preparing')} status
 * @param {string} statusMsg
 * @returns
 */
export function useUpdateOrderStatus(status, statusMsg) {
  const queryClient = useQueryClient();

  function updateOrderApi(orderId) {
    return updateOrder({ orderStatus: status }, orderId);
  }

  const { isLoading: isUpdating, mutate: updateOrderStatus } = useApiMutation({
    fn: updateOrderApi,
    key: [QUERY_KEYS.ORDERS],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDERS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDER],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.TODAY_MENU],
      });
    },
    successMsg: `Đơn hàng đã được đánh dấu ${statusMsg}!`,
  });

  return { isUpdating, updateOrderStatus };
}

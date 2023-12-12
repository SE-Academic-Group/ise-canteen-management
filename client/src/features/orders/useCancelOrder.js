import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateOrder } from "../../services/apiOrders";
import { QUERY_KEYS } from "../../constants/keys";

export function useCancelOrder() {
  const queryClient = useQueryClient();

  function cancelOrderApi(orderId) {
    return updateOrder(orderId, { orderStatus: "cancelled" });
  }

  const { isLoading: isCancelling, mutate: cancelOrder } = useMutation({
    mutationFn: cancelOrderApi,
    onSuccess: () => {
      toast.success("Đơn hàng đã được hủy, vui lòng thông báo cho khách hàng!");

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDERS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDER],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCancelling, cancelOrder };
}

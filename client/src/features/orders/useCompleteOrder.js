import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateOrder } from "../../services/apiOrders";
import { QUERY_KEYS } from "../../utils/constants";

export function useCompleteOrder() {
  const queryClient = useQueryClient();

  function completeOrderApi(orderId) {
    return updateOrder(orderId, { orderStatus: "completed" });
  }

  const { isLoading: isCompleting, mutate: completeOrder } = useMutation({
    mutationFn: completeOrderApi,
    onSuccess: () => {
      toast.success("Đơn hàng đã được đánh dấu hoàn thành!");

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDERS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ORDER],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCompleting, completeOrder };
}

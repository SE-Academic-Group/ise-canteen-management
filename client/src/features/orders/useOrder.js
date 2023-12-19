import { useParams } from "react-router-dom";
import { useQueryFetch } from "../../hooks/useQueryFetch";
import { getOrder } from "../../services/apiOrders";
import { QUERY_KEYS } from "../../constants/keys";

export function useOrder() {
  const { orderId } = useParams();

  const {
    isLoading,
    data: order = {},
    error,
  } = useQueryFetch({
    fn: () => getOrder(orderId),
    key: [QUERY_KEYS.ORDER, orderId],
  });

  return { isLoading, error, order };
}

import { useQueryFetch } from "../../hooks/useQueryFetch";
import { getMyOrders } from "../../services/apiOrders";
import { QUERY_KEYS } from "../../constants/keys";

export function useMyOrders(userId) {
  const { isLoading, error, data } = useQueryFetch({
    fn: () => getMyOrders(userId),
    key: [QUERY_KEYS.ORDERS, userId],
  });

  return { isLoading, error, orders: data?.data || [], count: data?.count };
}

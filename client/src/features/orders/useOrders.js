import { useQueryFetch } from "../../hooks/useQueryFetch";
import { useQueryPrefetch } from "../../hooks/useQueryPrefetch";
import { useApiParams } from "../../hooks/useApiParams";
import { getOrders } from "../../services/apiOrders";
import { QUERY_KEYS, PAGE_SIZE } from "../../utils/constants";

export function useOrders() {
  const { page } = useApiParams();
  const queryKey = [QUERY_KEYS.ORDERS, page];
  const queryOptions = { page };

  const {
    isLoading,
    error,
    data: { data, count },
  } = useQueryFetch({
    fn: () => getOrders(queryOptions),
    key: queryKey,
  });

  const noPage = Math.ceil(count / PAGE_SIZE);
  useQueryPrefetch({
    fn: () => getOrders({ ...queryOptions, page: page + 1 }),
    key: queryKey.with(1, page + 1),
    when: page < noPage,
  });
  useQueryFetch({
    fn: () => getOrders({ ...queryOptions, page: page - 1 }),
    key: queryKey.with(1, page - 1),
    when: page > 1,
  });

  return { isLoading, error, orders: data, count };
}

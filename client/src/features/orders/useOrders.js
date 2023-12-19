import { useQueryFetch } from "../../hooks/useQueryFetch";
import { useQueryPrefetch } from "../../hooks/useQueryPrefetch";
import { useApiParams } from "../../hooks/useApiParams";
import { getOrders } from "../../services/apiOrders";
import { PAGE_SIZE } from "../../constants/api";
import { QUERY_KEYS } from "../../constants/keys";

export function useOrders() {
  const { page, filters, sortBy } = useApiParams({
    filterFields: ["orderStatus"],
  });
  const queryKey = [QUERY_KEYS.ORDERS, page, filters, sortBy];
  const queryOptions = { page, filters, sortBy };

  const {
    isLoading,
    error,
    data: { data, count },
  } = useQueryFetch({
    fn: () => getOrders(queryOptions),
    key: queryKey,
    refetchInterval: 2500,
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

  return { isLoading, error, orders: data || [], count };
}

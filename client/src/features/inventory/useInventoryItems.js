import { useApiParams } from "../../hooks/useApiParams";
import { useQueryFetch } from "../../hooks/useQueryFetch";
import { useQueryPrefetch } from "../../hooks/useQueryPrefetch";
import { getInventoryItems } from "../../services/apiInventoryItems";
import { PAGE_SIZE } from "../../constants/api";
import { QUERY_KEYS } from "../../constants/keys";
export function useInventoryItems() {
  const { page, filters, sortBy, q } = useApiParams({
    filterFields: ["category"],
  });
  const queryKey = [QUERY_KEYS.INVENTORY_ITEMS, page, q, filters, sortBy];
  const queryOptions = { page, filters, sortBy, q };

  const {
    isLoading,
    error,
    data: { data, count },
  } = useQueryFetch({
    fn: () => getInventoryItems(queryOptions),
    key: queryKey,
  });

  const noPage = Math.ceil(count / PAGE_SIZE);

  useQueryPrefetch({
    fn: () => getInventoryItems({ ...queryOptions, page: page + 1 }),
    key: queryKey.with(1, page + 1),
    when: page < noPage,
  });

  useQueryPrefetch({
    fn: () => getInventoryItems({ ...queryOptions, page: page - 1 }),
    key: queryKey.with(1, page - 1),
    when: page > 1,
  });

  return { isLoading, error, inventoryItems: data || [], count };
}

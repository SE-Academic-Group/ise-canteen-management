import { useApiParams } from "../../hooks/useApiParams";
import { useQueryFetch } from "../../hooks/useQueryFetch";
import { useQueryPrefetch } from "../../hooks/useQueryPrefetch";
import { getProducts } from "../../services/apiProducts";
import { PAGE_SIZE } from "../../constants/api";
import { QUERY_KEYS } from "../../constants/keys";
export function useProducts() {
  const { page, q, filters, sortBy } = useApiParams({
    filterFields: ["category"],
  });

  const queryKey = [QUERY_KEYS.PRODUCTS, q ?? "", page, filters, sortBy ?? []];
  const queryOptions = { page, q, filters, sortBy };

  const {
    isLoading,
    error,
    data: { data, count },
  } = useQueryFetch({
    fn: () => getProducts(queryOptions),
    key: queryKey,
  });

  const noPages = Math.ceil(count / PAGE_SIZE);

  useQueryPrefetch({
    fn: () => getProducts({ ...queryOptions, page: page + 1 }),
    key: queryKey.with(2, page + 1),
    when: page < noPages,
  });
  useQueryPrefetch({
    fn: () => getProducts({ ...queryOptions, page: page - 1 }),
    key: queryKey.with(2, page - 1),
    when: page > 1,
  });

  return { isLoading, error, products: data, count };
}

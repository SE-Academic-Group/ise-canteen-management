import { useApiParams } from "../../hooks/useApiParams";
import { useQueryFetch } from "../../hooks/useQueryFetch";
import { useQueryPrefetch } from "../../hooks/useQueryPrefetch";
import { getProducts } from "../../services/apiProducts";
import { PAGE_SIZE, QUERY_KEYS } from "../../utils/constants";

export function useProducts() {
  const { page, q, filters, sortBy } = useApiParams({
    filterFields: ["category"],
  });
  const {
    isLoading,
    error,
    data: { data, count },
  } = useQueryFetch({
    fn: () => getProducts({ page, q, filters, sortBy }),
    key: [QUERY_KEYS.PRODUCTS, q ?? "", page, filters, sortBy ?? []],
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  useQueryPrefetch({
    fn: () => getProducts({ page: page + 1, q, filters, sortBy }),
    key: [QUERY_KEYS.PRODUCTS, q ?? "", page + 1, filters, sortBy ?? []],
    when: page < pageCount,
  });
  useQueryPrefetch({
    fn: () => getProducts({ page: page - 1, q, filters, sortBy }),
    key: [QUERY_KEYS.PRODUCTS, q ?? "", page - 1, filters, sortBy ?? []],
    when: page > 1,
  });

  return { isLoading, error, products: data, count };
}

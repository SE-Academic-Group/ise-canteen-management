import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../../services/apiProducts";
import { PAGE_SIZE, QUERY_KEYS } from "../../utils/constants";

export function useProducts() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const q = searchParams.get("q");
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const filterFields = ["category"];
  const filters = filterFields
    .map((field) => {
      const value = searchParams.get(field);
      return { field, value };
    })
    .filter((filter) => filter.value !== null && filter.value !== "all");

  const sortField = searchParams.get("sortBy");
  const sortInfo = sortField?.split("-");
  const sortBy = sortField
    ? { sort: sortInfo.at(0), order: sortInfo.at(1) }
    : null;

  const {
    isLoading,
    data: { data, count } = {},
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, q, page, filters, sortBy],
    queryFn: () => getProducts({ page, filters, sortBy, q }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.PRODUCTS, q, page + 1, filters, sortBy],
      queryFn: () => getProducts({ page: page + 1, filters, sortBy, q }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.PRODUCTS, q, page - 1, filters, sortBy],
      queryFn: () => getProducts({ page: page - 1, filters, sortBy, q }),
    });

  return { isLoading, error, products: data, count };
}

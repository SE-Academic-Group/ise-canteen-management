import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../../services/apiProducts";
import { PAGE_SIZE, QUERY_KEYS } from "../../utils/constants";

export function useProducts() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // #search
  const q = searchParams.get("q");
  // #end-search

  // TODO: refactor this code (extract to a hook)
  // #filter
  const filterFields = ["category"];
  const filters = filterFields
    .map((field) => {
      const value = searchParams.get(field);
      return { field, value };
    })
    .filter((filter) => filter.value !== null && filter.value !== "all");
  // #end-filter

  // TODO: refactor this code (extract to a hook)
  // #sort
  const sortField = searchParams.get("sortBy");
  const sortInfo = sortField?.split("-");
  const sortBy = sortField
    ? { sort: sortInfo.at(0), order: sortInfo.at(1) }
    : null;
  // #end-sort

  // TODO: refactor this code (extract to a hook)
  // #pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  // #end-pagination

  // TODO: refactor this code (extract to a hook)
  // #query
  const {
    isLoading,
    data: { data, count } = {},
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, q, page, filters, sortBy],
    queryFn: () => getProducts({ page, filters, sortBy, q }),
  });
  // #end-query

  // TODO: refactor this code (extract to a hook)
  // #prefetch
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
  // #end-prefetch

  return { isLoading, error, products: data, count };
}

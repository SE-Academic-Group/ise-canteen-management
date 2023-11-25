import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getOrders } from "../../services/apiOrders";
import { PAGE_SIZE, QUERY_KEYS } from "../../utils/constants";

export function useOrders() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // #filter
  const filterFields = ["orderStatus", "orderDate"];
  const filters = filterFields
    .map((field) => {
      const value = searchParams.get(field);
      return { field, value };
    })
    .filter((filter) => filter.value !== null && filter.value !== "all");
  // #end-filter

  // #sort
  const sortField = searchParams.get("sortBy");
  const sortInfo = sortField?.split("-");
  const sortBy = sortField
    ? { sort: sortInfo.at(0), order: sortInfo.at(1) }
    : null;
  // #end-sort

  // #pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  // #end-pagination

  // #query
  const {
    isLoading,
    data: { data, count } = {},
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.ORDERS, page, filters, sortBy],
    queryFn: () => getOrders({ page, filters, sortBy }),
  });
  // #end-query

  // #prefetch
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.ORDERS, page + 1, filters, sortBy],
      queryFn: () => getOrders({ page: page + 1, filters, sortBy }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.ORDERS, page - 1, filters, sortBy],
      queryFn: () => getOrders({ page: page - 1, filters, sortBy }),
    });
  // #end-prefetch

  return { isLoading, error, orders: data, count };
}

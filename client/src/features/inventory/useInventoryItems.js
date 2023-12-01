import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getInventoryItems } from "../../services/apiInventoryItems";
import { PAGE_SIZE, QUERY_KEYS } from "../../utils/constants";

export function useInventoryItems() {
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
    queryKey: [QUERY_KEYS.INVENTORY_ITEMS, q, page, filters, sortBy],
    queryFn: () => getInventoryItems({ page, filters, q, sortBy }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.INVENTORY_ITEMS, q, page + 1, filters, sortBy],
      queryFn: () => getInventoryItems({ page: page + 1, filters, q, sortBy }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.INVENTORY_ITEMS, q, page - 1, filters, sortBy],
      queryFn: () => getInventoryItems({ page: page - 1, filters, q, sortBy }),
    });

  return { isLoading, error, inventoryItems: data, count };
}

import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getUsers } from "../../services/apiUsers";
import { PAGE_SIZE, QUERY_KEYS } from "../../utils/constants";

export function useUsers() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // #filter
  const filterValue = searchParams.get("role");
  const filters =
    !filterValue || filterValue === "all"
      ? []
      : [{ field: "role", value: filterValue }];
  // #end-filter

  // #pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  // #end-pagination

  // #query
  const {
    isLoading,
    data: { data, count } = {},
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.USERS, page, filters],
    queryFn: () => getUsers({ page, filters }),
  });
  // #end-query

  // #prefetch
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.USERS, page + 1, filters],
      queryFn: () => getUsers({ page: page + 1, filters }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.USERS, page - 1, filters],
      queryFn: () => getUsers({ page: page - 1, filters }),
    });
  // #end-prefetch

  return { isLoading, error, users: data, count };
}

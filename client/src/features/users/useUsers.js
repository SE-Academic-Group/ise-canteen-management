import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getUsers } from "../../services/apiUsers";
import { PAGE_SIZE, QUERY_KEYS } from "../../utils/constants";

export function useUsers() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("role");
  const pageValue = searchParams.get("page") ?? 1;
  const page = pageValue * 1;

  const filters =
    !filterValue || filterValue === "all"
      ? []
      : [{ field: "role", value: filterValue }];

  const {
    isLoading,
    data: { data, count } = {},
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.USERS, page, filters],
    queryFn: () => getUsers({ page, filters }),
  });

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

  return { isLoading, error, users: data, count };
}

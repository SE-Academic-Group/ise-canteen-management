import { useApiParams } from "../../hooks/useApiParams";
import { useQueryFetch } from "../../hooks/useQueryFetch";
import { useQueryPrefetch } from "../../hooks/useQueryPrefetch";
import { getUsers } from "../../services/apiUsers";
import { PAGE_SIZE, QUERY_KEYS } from "../../utils/constants";

export function useUsers() {
  const { page, filters } = useApiParams({ filterFields: ["role"] });
  const queryKey = [QUERY_KEYS.USERS, page, filters];
  const queryOptions = { page, filters };

  const {
    isLoading,
    error,
    data: { data, count },
  } = useQueryFetch({
    fn: () => getUsers(queryOptions),
    key: queryKey,
  });

  const noPage = Math.ceil(count / PAGE_SIZE);

  useQueryPrefetch({
    fn: () => getUsers({ ...queryOptions, page: page + 1 }),
    key: queryKey.with(1, page + 1),
    when: page < noPage,
  });
  useQueryPrefetch({
    fn: () => getUsers({ ...queryOptions, page: page - 1 }),
    key: queryKey.with(1, page - 1),
    when: page > 1,
  });

  return { isLoading, error, users: data, count };
}

import { useApiParams } from "../../hooks/useApiParams";
import { useQueryFetch } from "../../hooks/useQueryFetch";
import { getUsers } from "../../services/apiUsers";
import { QUERY_KEYS } from "../../constants/keys";
import { useQueryPrefetch } from "../../hooks/useQueryPrefetch";

export function useCustomers() {
  const { q, page } = useApiParams();
  const filters = [{ field: "role", value: "customer" }];
  const queryKey = [QUERY_KEYS.USERS, filters, q, page];
  const queryOptions = { filters, q, page };

  const {
    isLoading,
    error,
    data: { data, count },
  } = useQueryFetch({
    fn: () => getUsers(queryOptions),
    key: queryKey,
  });

  const noPage = Math.ceil(count / 20);

  useQueryPrefetch({
    fn: () => getUsers({ ...queryOptions, page: page + 1 }),
    key: queryKey.with(3, page + 1),
    when: page < noPage,
  });

  useQueryPrefetch({
    fn: () => getUsers({ ...queryOptions, page: page - 1 }),
    key: queryKey.with(3, page - 1),
    when: page > 1,
  });

  return { isLoading, error, customers: data || [], count };
}

import { useApiParams } from "../../hooks/useApiParams";
import { useQueryFetch } from "../../hooks/useQueryFetch";
import { getUsers } from "../../services/apiUsers";
import { QUERY_KEYS } from "../../utils/constants";

export function useCustomers() {
  const { q } = useApiParams();
  const filters = [{ field: "role", value: "customer" }];
  const queryKey = [QUERY_KEYS.USERS, filters, q];
  const queryOptions = { filters, q, limit: 25 };

  const {
    isLoading,
    error,
    data: { data, count },
  } = useQueryFetch({
    fn: () => getUsers(queryOptions),
    key: queryKey,
  });

  return { isLoading, error, customers: data, count };
}

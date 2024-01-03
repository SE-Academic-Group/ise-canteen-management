import { QUERY_KEYS } from "../../constants/keys";
import { useQueryFetch } from "../../hooks/useQueryFetch";
import { getNumberOfCustomers } from "../../services/apiStats";
export function useNumberOfCustomers() {
  const queryKey = [QUERY_KEYS.NUMBER_OF_CUSTOMERS];

  const {
    isLoading,
    error,
    data: { data, count },
  } = useQueryFetch({
    fn: () => getNumberOfCustomers(),
    key: queryKey,
  });

  return { isLoading, error, customers: data, count };
}

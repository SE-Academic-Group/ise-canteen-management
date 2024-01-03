import { QUERY_KEYS } from "../../constants/keys";
import { useQueryFetch } from "../../hooks/useQueryFetch";
import { getRevenueStat } from "../../services/apiStats";
export function useRevenueStatDay() {
  const queryKey = [QUERY_KEYS.REVENUE_STAT];

  const {
    isLoading,
    error,
    data: { data },
  } = useQueryFetch({
    fn: () => getRevenueStat(),
    key: queryKey,
  });

  return { isLoading, error, revenueStatDay: data };
}

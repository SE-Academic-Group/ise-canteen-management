import { QUERY_KEYS } from "../../constants/keys";
import { useQueryFetch } from "../../hooks/useQueryFetch";
import { getRevenueStat } from "../../services/apiStats";
export function useRevenueStatMonth() {
  const queryKey = [QUERY_KEYS.REVENUE_STAT];
  const queryOptions = {
    filters: [
      {
        field: "type",
        value: "month",
      },
    ],
  };

  const {
    isLoading,
    error,
    data: { data },
  } = useQueryFetch({
    fn: () => getRevenueStat(queryOptions),
    key: queryKey,
  });

  return { isLoading, error, revenueStatMonth: data };
}

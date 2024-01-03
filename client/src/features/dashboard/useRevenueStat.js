import { QUERY_KEYS } from "../../constants/keys";
import { useApiParams } from "../../hooks/useApiParams";
import { useQueryFetch } from "../../hooks/useQueryFetch";
import { getRevenueStat } from "../../services/apiStats";
export function useRevenueStat() {
  const { filters } = useApiParams({ filterFields: ["type"] });
  const queryKey = [QUERY_KEYS.REVENUE_STAT, filters];
  const queryOptions = {
    filters:
      filters.length >= 1
        ? filters
        : [
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

  return { isLoading, error, revenueStat: data };
}

import { useApiParams } from "../../hooks/useApiParams";
import { useQueryFetch } from "../../hooks/useQueryFetch";
import { useQueryPrefetch } from "../../hooks/useQueryPrefetch";
import { getTodayMenu } from "../../services/apiTodayMenu";
import { QUERY_KEYS } from "../../constants/keys";
export function useTodayMenu() {
  const { q = "", filters = [] } = useApiParams({
    filterFields: ["category"],
  });

  const queryKey = [QUERY_KEYS.TODAY_MENU, q, filters];
  const queryOptions = { q, filters };

  const { isLoading, error, data } = useQueryFetch({
    fn: () => getTodayMenu(queryOptions),
    key: queryKey,
  });

  const prefetchCategoryOptions = {
    food: [{ filters: [{ field: "category", value: "food" }] }],
    beverage: [{ filters: [{ field: "category", value: "beverage" }] }],
    other: [{ filters: [{ field: "category", value: "other" }] }],
  };

  useQueryPrefetch({
    fn: () =>
      getTodayMenu({
        ...queryOptions,
        filters: prefetchCategoryOptions.food,
      }),
    key: queryKey.with(2, prefetchCategoryOptions.food),
  });
  useQueryPrefetch({
    fn: () =>
      getTodayMenu({
        ...queryOptions,
        filters: prefetchCategoryOptions.beverage,
      }),
    key: queryKey.with(2, prefetchCategoryOptions.beverage),
  });
  useQueryPrefetch({
    fn: () =>
      getTodayMenu({
        ...queryOptions,
        filters: prefetchCategoryOptions.other,
      }),
    key: queryKey.with(2, prefetchCategoryOptions.other),
  });

  return { isLoading, error, menuItems: data };
}

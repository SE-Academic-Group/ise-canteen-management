import { useApiParams } from "../../hooks/useApiParams";
import { useQueryFetch } from "../../hooks/useQueryFetch";
import { useQueryPrefetch } from "../../hooks/useQueryPrefetch";
import { getMenuHistories } from "../../services/apiMenuHistories";
import { PAGE_SIZE } from "../../constants/api";
import { QUERY_KEYS } from "../../constants/keys";
export function useMenuHistories() {
  const { page } = useApiParams();

  const queryKey = [QUERY_KEYS.MENUS, page];
  const queryOptions = { page, sortBy: { sort: "menuDate", order: "desc" } };

  const {
    isLoading,
    error,
    data: { data, count },
  } = useQueryFetch({
    fn: () => getMenuHistories(queryOptions),
    key: queryKey,
  });

  const noPages = Math.ceil(count / PAGE_SIZE);

  useQueryPrefetch({
    fn: () => getMenuHistories({ ...queryOptions, page: page + 1 }),
    key: queryKey.with(1, page + 1),
    when: page < noPages,
  });
  useQueryPrefetch({
    fn: () => getMenuHistories({ ...queryOptions, page: page - 1 }),
    key: queryKey.with(1, page - 1),
    when: page > 1,
  });

  return { isLoading, error, menuHistories: data || [], count };
}

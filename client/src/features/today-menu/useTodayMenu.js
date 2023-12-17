import { PAGE_SIZE } from "../../constants/api";
import { QUERY_KEYS } from "../../constants/keys";
import { useApiParams } from "../../hooks/useApiParams";
import { useQueryFetch } from "../../hooks/useQueryFetch";
import { useQueryPrefetch } from "../../hooks/useQueryPrefetch";
import { getTodayMenu } from "../../services/apiTodayMenu";
export function useTodayMenu() {
  const {
    page,
    q = "",
    filters = [],
  } = useApiParams({
    filterFields: ["category"],
  });

  const queryKey = [QUERY_KEYS.TODAY_MENU, q, filters, page];
  const queryOptions = { q, filters, page };

  const {
    isLoading,
    error,
    data: { data, count },
  } = useQueryFetch({
    fn: () => getTodayMenu(queryOptions),
    key: queryKey,
    refetchInterval: 2500,
  });

  const noPage = Math.ceil(count / PAGE_SIZE);

  useQueryPrefetch({
    fn: () => getTodayMenu({ ...queryOptions, page: page + 1 }),
    key: queryKey.with(-1, page + 1),
    when: page < noPage,
  });
  useQueryPrefetch({
    fn: () => getTodayMenu({ ...queryOptions, page: page - 1 }),
    key: queryKey.with(-1, page - 1),
    when: page > 1,
  });

  const menuItems = data;
  return {
    isLoading,
    error,
    count,
    menuItems: menuItems,
    isAlreadyCreated: menuItems == null ? false : true,
  };
}

import { QUERY_KEYS } from "../../constants/keys";
import { useApiParams } from "../../hooks/useApiParams";
import { useQueryFetch } from "../../hooks/useQueryFetch";
import { getTodayMenu } from "../../services/apiTodayMenu";
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

  const menuItems = data.data;
  return {
    isLoading,
    error,
    menuItems: menuItems,
    isAlreadyCreated: menuItems == null ? false : true,
  };
}

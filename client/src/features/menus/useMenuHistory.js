import { useParams } from "react-router-dom";
import { useQueryFetch } from "../../hooks/useQueryFetch";
import { getMenuHistory } from "../../services/apiMenuHistories";
import { QUERY_KEYS } from "../../constants/keys";

export function useMenuHistory() {
  const { menuId } = useParams();
  const {
    isLoading,
    data: menuHistory = {},
    error,
  } = useQueryFetch({
    fn: () => getMenuHistory(menuId),
    key: [QUERY_KEYS.MENU, menuId],
  });

  return { isLoading, error, menuHistory };
}

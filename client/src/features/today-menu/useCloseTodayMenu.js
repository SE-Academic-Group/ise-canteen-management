import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { closeTodayMenu as closeTodayMenuApi } from "../../services/apiTodayMenu";

export function useCloseTodayMenu() {
  const { isLoading: isClosing, mutate: closeTodayMenu } = useApiMutation({
    fn: closeTodayMenuApi,
    key: [QUERY_KEYS.TODAY_MENU],
    successMsg: "Đã đóng thực đơn hôm nay!",
  });

  return { isClosing, closeTodayMenu };
}

import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { deleteTodayMenuItem } from "../../services/apiTodayMenu";

export function useRemoveTodayMenuItem() {
  const { isLoading: isRemoving, mutate: removeTodayMenuItem } = useApiMutation(
    {
      fn: deleteTodayMenuItem,
      key: [QUERY_KEYS.TODAY_MENU],
      successMsg: "Đã xóa sản phẩm ra khỏi thực đơn!",
    }
  );

  return { isRemoving, removeTodayMenuItem };
}

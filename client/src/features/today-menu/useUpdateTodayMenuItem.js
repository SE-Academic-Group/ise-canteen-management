import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { updateTodayMenuItem as updateTodayMenuItemApi } from "../../services/apiTodayMenu";

export function useUpdateTodayMenuItem() {
  const { mutate: updateTodayMenuItem, isLoading: isUpdating } = useApiMutation(
    {
      fn: ({ newItemData, id }) => updateTodayMenuItemApi(newItemData, id),
      key: [QUERY_KEYS.TODAY_MENU],
      successMsg: "Cập nhật thông tin số lượng thành công!",
    }
  );

  return { isUpdating, updateTodayMenuItem };
}

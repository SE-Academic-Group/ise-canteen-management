import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { createTodayMenu as createTodayMenuApi } from "../../services/apiTodayMenu";

export function useCreateTodayMenu() {
  const { isLoading: isCreating, mutate: createTodayMenu } = useApiMutation({
    fn: createTodayMenuApi,
    key: [QUERY_KEYS.TODAY_MENU],
    successMsg: "Tạo thực đơn thành công!",
  });

  return { isCreating, createTodayMenu };
}

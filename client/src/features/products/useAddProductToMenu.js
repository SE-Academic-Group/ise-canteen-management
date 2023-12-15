import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { addTodayMenuItem } from "../../services/apiTodayMenu";

export function useAddProductToTodayMenu() {
  const { mutate: addProductToTodayMenu, isLoading: isAdding } = useApiMutation(
    {
      fn: addTodayMenuItem,
      key: [QUERY_KEYS.TODAY_MENU],
      successMsg: "Đã thêm sản phẩm vào thực đơn!",
    }
  );

  return { isAdding, addProductToTodayMenu };
}

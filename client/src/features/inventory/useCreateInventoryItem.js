import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { createEditInventoryItem } from "../../services/apiInventoryItems";

export function useCreateInventoryItem() {
  const { mutate: createInventoryItem, isLoading: isCreating } = useApiMutation(
    {
      fn: createEditInventoryItem,
      key: [QUERY_KEYS.INVENTORY_ITEMS],
      successMsg: "Thông tin kho liệu đã được tạo!",
    }
  );

  return { isCreating, createInventoryItem };
}

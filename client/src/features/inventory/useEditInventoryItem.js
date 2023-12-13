import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { createEditInventoryItem } from "../../services/apiInventoryItems";

export function useEditInventoryItem() {
  const { isLoading: isEditing, mutate: editInventoryItem } = useApiMutation({
    fn: ({ newItemData, id }) => createEditInventoryItem(newItemData, id),
    key: [QUERY_KEYS.INVENTORY_ITEMS],
    successMsg: "Cập nhật thông tin sản phẩm thành công!",
  });

  return { isEditing, editInventoryItem };
}

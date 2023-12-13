import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { deleteInventoryItem as deleteInventoryItemApi } from "../../services/apiInventoryItems";

export function useDeleteInventoryItem() {
  const { isLoading: isDeleting, mutate: deleteInventoryItem } = useApiMutation(
    {
      fn: deleteInventoryItemApi,
      key: [QUERY_KEYS.INVENTORY_ITEMS],
      successMsg: "Xóa thông tin thành công!",
    }
  );

  return { isDeleting, deleteInventoryItem };
}

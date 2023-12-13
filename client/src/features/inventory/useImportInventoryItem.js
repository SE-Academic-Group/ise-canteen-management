import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { importInventoryItem as importInventoryItemApi } from "../../services/apiInventoryItems";

export function useImportInventoryItem() {
  const { isLoading: isImporting, mutate: importInventoryItem } =
    useApiMutation({
      fn: importInventoryItemApi,
      key: [QUERY_KEYS.INVENTORY_ITEMS],
      successMsg: "Đã cập nhật thông tin nhập hàng!",
    });

  return { isImporting, importInventoryItem };
}

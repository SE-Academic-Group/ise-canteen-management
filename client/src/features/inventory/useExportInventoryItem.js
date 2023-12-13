import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { exportInventoryItem as exportInventoryItemApi } from "../../services/apiInventoryItems";

export function useExportInventoryItem() {
  const { mutate: exportInventoryItem, isLoading: isExporting } =
    useApiMutation({
      fn: exportInventoryItemApi,
      key: [QUERY_KEYS.INVENTORY_ITEMS],
      successMsg: "Đã cập nhật thông tin xuất hàng!",
    });

  return { isExporting, exportInventoryItem };
}

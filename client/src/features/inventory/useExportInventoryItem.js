import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { exportInventoryItem as exportInventoryItemApi } from "../../services/apiInventoryItems";
import { QUERY_KEYS } from "../../constants/keys";

export function useExportInventoryItem() {
  const queryClient = useQueryClient();

  const { mutate: exportInventoryItem, isLoading: isExporting } = useMutation({
    mutationFn: exportInventoryItemApi,
    onSuccess: () => {
      toast.success("Đã cập nhật thông tin xuất hàng!");

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INVENTORY_ITEMS] });
    },
    onError: (err) => toast.error(err.message ?? "Có lỗi xảy ra!"),
  });

  return { isExporting, exportInventoryItem };
}

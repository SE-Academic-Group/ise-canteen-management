import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { importInventoryItem as importInventoryItemApi } from "../../services/apiInventoryItems";
import { QUERY_KEYS } from "../../constants/keys";

export function useImportInventoryItem() {
  const queryClient = useQueryClient();

  const { mutate: importInventoryItem, isLoading: isImporting } = useMutation({
    mutationFn: importInventoryItemApi,
    onSuccess: () => {
      toast.success("Đã cập nhật thông tin nhập hàng!");

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INVENTORY_ITEMS] });
    },
    onError: (err) => toast.error(err.message ?? "Có lỗi xảy ra!"),
  });

  return { isImporting, importInventoryItem };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createEditInventoryItem } from "../../services/apiInventoryItems";
import { QUERY_KEYS } from "../../constants/keys";

export function useCreateInventoryItem() {
  const queryClient = useQueryClient();

  const { mutate: createInventoryItem, isLoading: isCreating } = useMutation({
    mutationFn: createEditInventoryItem,
    onSuccess: () => {
      toast.success("Thông tin kho liệu đã được tạo!");

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INVENTORY_ITEMS] });
    },
    onError: (err) => toast.error(err.message ?? "Có lỗi xảy ra!"),
  });

  return { isCreating, createInventoryItem };
}

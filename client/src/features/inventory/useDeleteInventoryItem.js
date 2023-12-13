import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteInventoryItem as deleteInventoryItemApi } from "../../services/apiInventoryItems";
import { QUERY_KEYS } from "../../constants/keys";

export function useDeleteInventoryItem() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteInventoryItem } = useMutation({
    mutationFn: deleteInventoryItemApi,
    onSuccess: () => {
      toast.success("Xóa thông tin thành công!");

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.INVENTORY_ITEMS],
      });
    },
    onError: (err) => toast.error(err.message ?? "Có lỗi xảy ra!"),
  });

  return { isDeleting, deleteInventoryItem };
}

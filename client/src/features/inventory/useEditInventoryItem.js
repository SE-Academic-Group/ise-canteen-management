import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createEditInventoryItem } from "../../services/apiInventoryItems";
import { QUERY_KEYS } from "../../constants/keys";

export function useEditInventoryItem() {
  const queryClient = useQueryClient();

  const { mutate: editInventoryItem, isLoading: isEditing } = useMutation({
    mutationFn: ({ newItemData, id }) =>
      createEditInventoryItem(newItemData, id),
    onSuccess: () => {
      toast.success("Cập nhật thông tin sản phẩm thành công!");

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INVENTORY_ITEMS] });
    },
    onError: (err) =>
      toast.error(err.message ?? "Cập nhật thông tin thất bại!"),
  });

  return { isEditing, editInventoryItem };
}

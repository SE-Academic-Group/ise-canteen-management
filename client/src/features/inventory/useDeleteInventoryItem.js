import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteProduct as deleteProductApi } from "../../services/apiProducts";
import { QUERY_KEYS } from "../../utils/constants";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteProduct } = useMutation({
    mutationFn: deleteProductApi,
    onSuccess: () => {
      toast.success("Xóa sản phẩm thành công!");

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRODUCTS],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteProduct };
}

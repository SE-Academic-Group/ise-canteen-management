import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createEditProduct } from "../../services/apiProducts";
import { QUERY_KEYS } from "../../utils/constants";

export function useEditProduct() {
  const queryClient = useQueryClient();

  const { mutate: editProduct, isLoading: isEditing } = useMutation({
    mutationFn: ({ newProductData, id }) =>
      createEditProduct(newProductData, id),
    onSuccess: () => {
      toast.success("Cập nhật thông tin sản phẩm thành công!");

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editProduct };
}

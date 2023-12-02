import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createEditProduct } from "../../services/apiProducts";
import { QUERY_KEYS } from "../../utils/constants";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const { mutate: createProduct, isLoading: isCreating } = useMutation({
    mutationFn: createEditProduct,
    onSuccess: () => {
      toast.success("Tạo sản phẩm thành công!");

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createProduct };
}

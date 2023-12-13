import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { createEditProduct } from "../../services/apiProducts";

export function useCreateProduct() {
  const { mutate: createProduct, isLoading: isCreating } = useApiMutation({
    fn: createEditProduct,
    key: [QUERY_KEYS.PRODUCTS],
    successMsg: "Tạo sản phẩm thành công!",
  });

  return { isCreating, createProduct };
}

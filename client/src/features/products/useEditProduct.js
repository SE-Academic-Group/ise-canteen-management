import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { createEditProduct } from "../../services/apiProducts";

export function useEditProduct() {
  const { mutate: editProduct, isLoading: isEditing } = useApiMutation({
    fn: ({ newProductData, id }) => createEditProduct(newProductData, id),
    key: [QUERY_KEYS.PRODUCTS],
    successMsg: "Cập nhật thông tin sản phẩm thành công!",
  });

  return { isEditing, editProduct };
}

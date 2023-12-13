import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { deleteProduct as deleteProductApi } from "../../services/apiProducts";

export function useDeleteProduct() {
  const { isLoading: isDeleting, mutate: deleteProduct } = useApiMutation({
    fn: deleteProductApi,
    key: [QUERY_KEYS.PRODUCTS],
    successMsg: "Xóa sản phẩm thành công!",
  });

  return { isDeleting, deleteProduct };
}

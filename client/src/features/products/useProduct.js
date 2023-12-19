import { useParams } from "react-router-dom";
import { useQueryFetch } from "../../hooks/useQueryFetch";

import { getProduct } from "../../services/apiProducts";
import { QUERY_KEYS } from "../../constants/keys";

export function useProduct() {
  const { productId } = useParams();
  const {
    isLoading,
    data: product = {},
    error,
  } = useQueryFetch({
    fn: () => getProduct(productId),
    key: [QUERY_KEYS.PRODUCT, productId],
  });

  return { isLoading, error, product };
}

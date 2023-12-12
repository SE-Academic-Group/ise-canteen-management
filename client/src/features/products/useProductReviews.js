import { useQueryFetch } from "../../hooks/useQueryFetch";
import { getProductReviews } from "../../services/apiProducts";
import { QUERY_KEYS } from "../../constants/keys";

export function useProductReviews(productId) {
  const { isLoading, error, data } = useQueryFetch({
    fn: () => getProductReviews(productId),
    key: [QUERY_KEYS.PRODUCT_REVIEWS, productId],
  });

  return { isLoading, error, reviews: data?.data, count: data?.count };
}

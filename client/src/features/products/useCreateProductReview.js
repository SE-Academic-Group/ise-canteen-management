import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { createReview as createReviewApi } from "../../services/apiReviews";

export function useCreateProductReview() {
  const { mutate: createProductReview, isLoading: isCreating } = useApiMutation(
    {
      fn: createReviewApi,
      key: [QUERY_KEYS.PRODUCT_REVIEWS],
      successMsg: "Đã gửi đánh giá của bạn!",
    }
  );

  return { isCreating, createProductReview };
}

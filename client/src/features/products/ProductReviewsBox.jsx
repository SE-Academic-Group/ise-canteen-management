import { useProductReviews } from "./useProductReviews";

import ReviewItem from "../../ui/ReviewItem";
import ReviewsBox from "../../ui/ReviewsBox";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import ErrorLoading from "../../ui/ErrorLoading";

function ProductReviewsBox({ productId }) {
  const { isLoading, reviews, count, error } = useProductReviews(productId);

  if (error) return <ErrorLoading error={error} />;

  if (isLoading) return <Spinner />;

  if (!reviews) return <Empty resourceName="Đánh giá" />;

  return (
    <ReviewsBox>
      {count === 0 ? (
        <p>Chưa có đánh giá cho sản phẩm này</p>
      ) : (
        reviews.map((review) => <ReviewItem key={review._id} review={review} />)
      )}
    </ReviewsBox>
  );
}

export default ProductReviewsBox;

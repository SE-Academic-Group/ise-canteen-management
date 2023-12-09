import Empty from "../../ui/Empty";
import ReviewItem from "../../ui/ReviewItem";
import ReviewsBox from "../../ui/ReviewsBox";
import Spinner from "../../ui/Spinner";
import { useProductReviews } from "./useProductReviews";

function ProductReviewsBox({ productId }) {
  const { isLoading, reviews, count } = useProductReviews(productId);

  if (isLoading) return <Spinner />;

  if (!reviews) return <Empty resourceName="Đánh giá" />;

  return (
    <ReviewsBox>
      {count === 0 ? (
        <p>Chưa có đánh giá cho sản phẩm này</p>
      ) : (
        reviews.map((review) => <ReviewItem key={review.id} review={review} />)
      )}
    </ReviewsBox>
  );
}

export default ProductReviewsBox;

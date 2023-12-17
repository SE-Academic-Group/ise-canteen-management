import styled from "styled-components";
import { useProductReviews } from "../products/useProductReviews";

import ErrorLoading from "../../ui/ErrorLoading";
import ReviewItem from "../../ui/ReviewItem";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import Empty from "../../ui/Empty";

const ReviewsBox = styled.section`
  background-color: var(--color-grey-50);
  padding: 1.6rem;
  border-radius: var(--border-radius-md);
  font-size: 1.4rem;
`;

const Layout = styled.div`
  max-block-size: 44rem;
  overflow: auto;
  padding-inline-end: 0.4rem;
  margin-inline-end: -0.4rem;

  & > :not(:last-child) {
    margin-block-end: 0.8rem;
  }
`;

const ReviewHeading = styled(Heading)`
  font-size: 1.8rem;
  margin-bottom: 1.8rem;
`;

function ProductReviews({ productId }) {
  const { isLoading, reviews, count, error } = useProductReviews(productId);

  if (error) return <ErrorLoading error={error} />;

  if (isLoading) return <Spinner />;

  if (!count) return <Empty resourceName="Đánh giá" />;

  return (
    <ReviewsBox>
      <ReviewHeading as="h4">Đánh giá</ReviewHeading>
      <Layout className="custom-scrollbar">
        {count === 0 ? (
          <p>Chưa có đánh giá cho sản phẩm này</p>
        ) : (
          reviews.map((review) => (
            <ReviewItem key={review._id} review={review} />
          ))
        )}
      </Layout>
    </ReviewsBox>
  );
}

export default ProductReviews;

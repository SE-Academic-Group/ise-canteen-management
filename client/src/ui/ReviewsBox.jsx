import styled from "styled-components";
import Heading from "./Heading";

const StyledReviewsBox = styled.section`
  background-color: var(--color-grey-100);
  padding: 1.6rem;
  border-radius: var(--border-radius-md);
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;
  max-block-size: 42rem;
  overflow: auto;
`;

const ReviewHeading = styled(Heading)`
  font-size: 1.8rem;
  margin-bottom: 1.8rem;
  text-decoration: double underline var(--color-grey-700);
`;

function ReviewsBox({ children }) {
  return (
    <StyledReviewsBox>
      <ReviewHeading as="h4">Đánh giá</ReviewHeading>
      <Layout>{children}</Layout>
    </StyledReviewsBox>
  );
}

export default ReviewsBox;
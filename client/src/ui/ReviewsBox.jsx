import styled from "styled-components";
import Heading from "./Heading";

const StyledReviewsBox = styled.section`
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
`;

const Layout = styled.div.attrs({
  className: "custom-scrollbar",
})`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;
  max-block-size: 42rem;
  overflow: auto;
  padding-inline-end: 0.8rem;
  margin-inline-end: -0.8rem;
`;

const ReviewHeading = styled(Heading)`
  font-size: 1.8rem;
  margin-bottom: 1.8rem;
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

import styled from "styled-components";
import Heading from "./Heading";
import ResetURLButton from "./ResetURLButton";

const Container = styled.div`
  background-color: var(--color-grey-100);
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function PageHeading({ children }) {
  return (
    <Container>
      <Heading as="h1">{children}</Heading>
      <ResetURLButton />
    </Container>
  );
}

export default PageHeading;

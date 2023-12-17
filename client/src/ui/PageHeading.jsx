import styled from "styled-components";
import Heading from "./Heading";
import ResetURLButton from "./ResetURLButton";
import RefreshButton from "./RefreshButton";

const Container = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function PageHeading({ children, queryKey, noReset = false }) {
  return (
    <Container>
      <Heading as="h1">{children}</Heading>
      {!noReset && <ResetURLButton />}
      {queryKey && <RefreshButton queryKey={queryKey} />}
    </Container>
  );
}

export default PageHeading;

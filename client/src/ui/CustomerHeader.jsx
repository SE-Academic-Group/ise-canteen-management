import styled from "styled-components";
import CustomerAvatar from "../features/authentication/CustomerAvatar";
import CustomerHeaderMenu from "./CustomerHeaderMenu";
import CustomerHomeButton from "./CustomerHomeButton";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
`;

const Container = styled.div`
  max-width: var(--main-width-sm, 120rem);
  margin: 0 auto;

  padding: 1.2rem 1.6rem;
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;

  & > :first-child {
    margin-right: auto;
  }
`;

function CustomerHeader() {
  return (
    <StyledHeader>
      <Container sm>
        <CustomerHomeButton />
        <CustomerHeaderMenu />
        <CustomerAvatar />
      </Container>
    </StyledHeader>
  );
}

export default CustomerHeader;

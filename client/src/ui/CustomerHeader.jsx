import styled from "styled-components";
import CustomerAvatar from "../features/authentication/CustomerAvatar";
import CustomerHeaderMenu from "./CustomerHeaderMenu";
import CustomerHomeButton from "./CustomerHomeButton";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 1.6rem;
  border-bottom: 1px solid var(--color-grey-100);

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
      <CustomerHomeButton />
      <CustomerHeaderMenu />
      <CustomerAvatar />
    </StyledHeader>
  );
}

export default CustomerHeader;

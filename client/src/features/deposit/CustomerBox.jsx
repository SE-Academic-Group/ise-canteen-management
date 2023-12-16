import styled from "styled-components";

const Container = styled.button`
  padding: 1.2rem;
  border: 2px dashed var(--color-grey-200);
  border-radius: 8px;
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  cursor: pointer;

  & span:nth-child(2) {
    font-size: 1.4rem;
  }

  & span {
    text-overflow: ellipsis;
    max-width: 100%;
    overflow: hidden;
    text-wrap: nowrap;
  }

  &:hover {
    background-color: var(--color-grey-100);
  }

  &.active {
    background-color: var(--color-brand-200);
    color: var(--color-brand-600);
  }
`;

function CustomerBox({ customer, active, onClick }) {
  return (
    <Container className={active ? "active" : ""} onClick={onClick}>
      <span>{customer.name}</span>
      <span>{customer.email}</span>
    </Container>
  );
}

export default CustomerBox;

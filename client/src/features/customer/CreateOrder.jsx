import styled from "styled-components";
import CreateOrderContent from "./CreateOrderContent";

const Container = styled.div`
  padding-block: 1.6rem 4.8rem;
  & > *:not(:last-child) {
    margin-bottom: 2.4rem;
  }
`;

function CreateOrder() {
  return (
    <Container>
      <CreateOrderContent />
    </Container>
  );
}

export default CreateOrder;

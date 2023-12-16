import styled from "styled-components";
import CreateOrderContent from "./CreateOrderContent";

const Container = styled.div`
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

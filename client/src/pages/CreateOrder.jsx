import styled from "styled-components";
import CreateOrderContent from "../features/orders/CreateOrderContent";
import TodayMenuFilter from "../features/today-menu/TodayMenuFilter";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

function CreateOrder() {
  return (
    <Container>
      <TodayMenuFilter />
      <CreateOrderContent />
    </Container>
  );
}

export default CreateOrder;

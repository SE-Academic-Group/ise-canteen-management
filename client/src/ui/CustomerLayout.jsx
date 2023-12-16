import { Outlet } from "react-router-dom";
import CustomerHeader from "./CustomerHeader";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main.attrs({
  className: "custom-scrollbar",
})`
  background-color: var(--color-grey-50);
  padding: 1.6rem;
  overflow-y: auto;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function CustomerLayout() {
  return (
    <StyledAppLayout>
      <CustomerHeader />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );

  // return <div>customer layout</div>;
}

export default CustomerLayout;

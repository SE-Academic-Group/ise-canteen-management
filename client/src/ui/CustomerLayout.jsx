import { Outlet } from "react-router-dom";

import CustomerHeader from "./CustomerHeader";
import Container from "./Container";
import Layout from "./Layout";
import Main from "./Main";

function CustomerLayout() {
  return (
    <Layout vertical>
      <CustomerHeader />
      <Main>
        <Container sm>
          <Outlet />
        </Container>
      </Main>
    </Layout>
  );
}

export default CustomerLayout;

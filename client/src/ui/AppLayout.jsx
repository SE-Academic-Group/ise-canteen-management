import { Outlet } from "react-router-dom";

import Container from "./Container";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Layout from "./Layout";
import Main from "./Main";

function AppLayout() {
  return (
    <Layout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </Layout>
  );
}

export default AppLayout;

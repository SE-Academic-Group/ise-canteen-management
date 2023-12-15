import styled from "styled-components";
import MenuItem from "./MenuItem";

const Container = styled.div`
  background-color: var(--color-grey-100);
  padding: 2.4rem;
  border-radius: 4px;
  margin-block: 2rem;
`;

const Layout = styled.div.attrs({
  className: "custom-scrollbar",
})`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 2.4rem;
  max-block-size: 80rem;
  overflow: auto;
  padding-inline-end: 1rem;
  margin-inline-end: -1rem;
`;

const Heading = styled.h3`
  font-size: 2.4rem;
  font-weight: 500;
  margin-bottom: 2.4rem;
  text-align: center;
`;

function MenuItemsBox({ menuItems = [] }) {
  return (
    <Container>
      <Heading>Danh sách chi tiết</Heading>
      <Layout>
        {menuItems.map((menuItem) => (
          <MenuItem key={menuItem._id} menuItem={menuItem} />
        ))}
      </Layout>
    </Container>
  );
}

export default MenuItemsBox;

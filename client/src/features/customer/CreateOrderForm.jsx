import styled from "styled-components";
import MenuItem from "./MenuItem";
import Pagination from "../../ui/Pagination";

const Border = styled.div`
  border: 2px solid var(--color-brand-600);
  padding: 1.2rem;
  border-radius: 8px;
`;

const Layout = styled.div`
  --_grid-item-width: 12rem;

  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(var(--_grid-item-width, 20rem), 1fr)
  );
  gap: 1.6rem;
`;

function CreateOrderForm({
  count,
  menuItems = [],
  handleAddItem,
  handleRemoveItem,
  handleCheckActive,
}) {
  return (
    <Border>
      <Layout>
        {menuItems.map((item) => (
          <MenuItem
            item={item}
            key={item._id}
            handleAddItem={handleAddItem}
            handleRemoveItem={handleRemoveItem}
            active={handleCheckActive(item._id)}
          />
        ))}
      </Layout>
      <Pagination count={count} hasBox compact />
    </Border>
  );
}

export default CreateOrderForm;

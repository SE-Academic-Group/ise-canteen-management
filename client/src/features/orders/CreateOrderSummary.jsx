import styled from "styled-components";
import Empty from "../../ui/Empty";
import DataItem from "../../ui/DataItem";
import MenuItemSummary from "./MenuItemSummary";
import { MdOutlineNumbers } from "react-icons/md";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { formatVietnameseCurrency } from "../../utils/helpers";

const Border = styled.div`
  border: 2px solid var(--color-brand-200);
  padding: 2.4rem;
  border-radius: 8px;
  margin-block-end: 2rem;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 4.8rem;
`;

function CreateOrderSummary({
  addedItems = [],
  handleRemoveItem,
  handleUpdateQuantity,
}) {
  if (addedItems.length === 0) {
    return <Empty description="Bạn chưa thêm sản phẩm nào" />;
  }

  const total = addedItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <Border>
      <Layout>
        <div>
          {addedItems.map((item) => (
            <MenuItemSummary
              key={item.id}
              item={item}
              handleRemoveItem={handleRemoveItem}
              handleUpdateQuantity={handleUpdateQuantity}
            />
          ))}
        </div>
        <div>
          <h3>Tóm tắt</h3>
          <DataItem label="Tổng số sản phẩm" icon={<MdOutlineNumbers />}>
            {addedItems.length}
          </DataItem>
          <DataItem label="Tổng tiền" icon={<FaRegMoneyBillAlt />}>
            {formatVietnameseCurrency(total)}
          </DataItem>
        </div>
      </Layout>
    </Border>
  );
}

export default CreateOrderSummary;

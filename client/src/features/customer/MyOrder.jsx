import styled from "styled-components";
import { formatDateTime, formatVietnameseCurrency } from "../../utils/helpers";
import Tag from "../../ui/Tag";
import { ORDER_STATUS_TAGS } from "../../constants/tags";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const Container = styled.details`
  padding: 1.2rem;
  border-radius: 0.8rem;
  background-color: var(--color-grey-0);
  border: 1px dashed var(--color-brand-200);

  .close {
    display: none;
  }

  &[open] {
    .open {
      display: none;
    }
    .close {
      display: block;
    }
  }

  &:not(:last-child) {
    margin-bottom: 1.2rem;
  }
`;

const Title = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  padding-block: 0.4rem;
  font-size: 1.4rem;

  & div {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

const Body = styled.div`
  font-size: 1.4rem;
  padding-block: 0.8rem;
  border-top: 1px dashed var(--color-grey-300);
`;

const TotalPrice = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  margin-block-start: 0.4rem;
`;

function MyOrder({ order }) {
  const { orderDate, orderStatus, orderItems, totalPrice } = order;
  const tag = ORDER_STATUS_TAGS[orderStatus];

  return (
    <Container>
      <Title>
        <div>
          <span className="open">
            <IoMdArrowDropdown size={24} />
          </span>
          <span className="close">
            <IoMdArrowDropup size={24} />
          </span>
          <time>{formatDateTime(orderDate)}</time>
        </div>
        <Tag type={tag.type}>{tag.label}</Tag>
      </Title>
      <Body>
        {orderItems.map((item) => (
          <li key={item._id}>
            {item.productId.name} ({formatVietnameseCurrency(item.price)}) x{" "}
            {item.quantity}
          </li>
        ))}
        <TotalPrice>
          Tổng tiền: {formatVietnameseCurrency(totalPrice)}
        </TotalPrice>
      </Body>
    </Container>
  );
}

export default MyOrder;

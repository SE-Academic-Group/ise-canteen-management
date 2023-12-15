import { NavLink } from "react-router-dom";
import { format } from "date-fns";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import styled from "styled-components";

import ButtonText from "../../ui/ButtonText";
import DataItem from "../../ui/DataItem";
import Heading from "../../ui/Heading";

import { formatVietnameseCurrency } from "../../utils/helpers";

const StyledBookingDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-block: 1.6rem;
  color: var(--color-grey-500);
`;

const Price = styled.div`
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: var(--color-green-100);
  color: var(--color-green-700);

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

function OrderDataBox({ order }) {
  const { orderDate, totalPrice, orderItems, userId } = order;
  const user = userId ?? { name: "Khách", email: "N/A" };

  return (
    <StyledBookingDataBox>
      <Header>
        <Heading as="h2">Phiếu đơn hàng</Heading>
        <div>
          <p>
            <span>Người đặt: </span>({user.name}
            <span role="presentation"> &bull; </span>
            {user.email})
          </p>
        </div>
      </Header>

      <Section>
        <Heading as="h3" aria-label="Các món đã đặt">
          Thông tin đơn hàng
        </Heading>
        <Items>
          {orderItems.map((item) => (
            <DataItem label={item.productId.name} key={item.productId._id}>
              <span role="presentation">
                ({formatVietnameseCurrency(item.price)})
              </span>
              <span role="presentation">x {item.quantity}</span>
              <ButtonText>
                <NavLink to={`/products/${item.productId._id}`}>
                  Chi tiết
                </NavLink>
              </ButtonText>
            </DataItem>
          ))}
        </Items>

        <Price>
          <DataItem icon={<HiOutlineCurrencyDollar />} label="Tổng cộng">
            {formatVietnameseCurrency(totalPrice)}
          </DataItem>
        </Price>
      </Section>

      <Footer>
        <p>Đặt lúc {format(new Date(orderDate), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default OrderDataBox;

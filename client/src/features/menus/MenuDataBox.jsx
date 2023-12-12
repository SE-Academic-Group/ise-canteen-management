import styled from "styled-components";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { MdOutlineRestaurantMenu, MdOutlinePercent } from "react-icons/md";

import DataItem from "../../ui/DataItem";
import Heading from "../../ui/Heading";
import MenuItemsBox from "./MenuItemsBox";

import { formatDate, formatVietnameseCurrency } from "../../utils/helpers";
import {
  calculateRevenue,
  createMenuSummary,
} from "../../services/MenuOperations";

const StyledProductDataBox = styled.section`
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
`;

const Section = styled.section`
  padding: 3.2rem 4rem;
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

function MenuDataBox({ menuHistory }) {
  const { menuDate, menuItems } = menuHistory;
  const revenue = calculateRevenue(menuItems);
  const summary = createMenuSummary(menuItems);

  return (
    <StyledProductDataBox>
      <Header>
        <Heading as="h2">Thực đơn ngày {formatDate(menuDate)}</Heading>
      </Header>

      <Section>
        <DataItem icon={<MdOutlineRestaurantMenu />} label="Số  sản phẩm">
          {summary.totalItems}
        </DataItem>
        <DataItem icon={<MdOutlinePercent />} label="Tỉ lệ sản phẩm bán">
          {summary.percentageSold}%
        </DataItem>

        <MenuItemsBox menuItems={menuItems} />

        <Price>
          <DataItem icon={<HiOutlineCurrencyDollar />} label="Doanh thu">
            {formatVietnameseCurrency(revenue)}
          </DataItem>
        </Price>
      </Section>
    </StyledProductDataBox>
  );
}

export default MenuDataBox;

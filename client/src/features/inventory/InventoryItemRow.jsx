import {
  HiEye,
  HiMiniArrowLeftOnRectangle,
  HiMiniArrowRightOnRectangle,
} from "react-icons/hi2";
import styled from "styled-components";

import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

import { formatVietnameseCurrency } from "../../utils/helpers";
import { categoryToVietnamese, unitToVietnamese } from "../../utils/translator";

const Name = styled.div`
  font-weight: 600;
  color: var(--color-grey-600);
  word-break: break-all;
`;

const Amount = styled.div`
  font-weight: 500;
`;

const Description = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
`;

const categoryToTagName = {
  ingredient: "green",
  spice: "red",
  drink: "blue",
  other: "grey",
};

function InventoryItemRow({ item }) {
  const { id, name, price, description, category, unit, stockAmount } = item;

  return (
    <Table.Row>
      <Name>{name}</Name>

      <Amount>{formatVietnameseCurrency(price)}</Amount>

      <Description>{description}</Description>

      <Tag type={categoryToTagName[category]}>
        {categoryToVietnamese(category)}
      </Tag>

      <span>
        {stockAmount} {unitToVietnamese(unit)}
      </span>

      <Menus.Menu>
        <Menus.Toggle id={id} />
        <Menus.List id={id}>
          <Menus.Button icon={<HiEye />}>Xem chi tiết</Menus.Button>
          <Menus.Button icon={<HiMiniArrowLeftOnRectangle />}>
            Nhập kho
          </Menus.Button>
          <Menus.Button icon={<HiMiniArrowRightOnRectangle />}>
            Xuất kho
          </Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default InventoryItemRow;

import {
  HiEye,
  HiTrash,
  HiPencil,
  HiMiniArrowLeftOnRectangle,
  HiMiniArrowRightOnRectangle,
} from "react-icons/hi2";

import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

import { formatVietnameseCurrency } from "../../utils/helpers";
import { TRANSLATOR_KEYS, translator } from "../../utils/translator";

const categoryToTagName = {
  ingredient: "green",
  spice: "red",
  drink: "blue",
  other: "grey",
};

function transformItem(item) {
  const transformed = {
    ...item,
    price: formatVietnameseCurrency(item.price),
    stockAmount:
      item.stockAmount + " " + translator(TRANSLATOR_KEYS.UNIT, item.unit),
    category: {
      tag: categoryToTagName[item.category],
      name: translator(TRANSLATOR_KEYS.CATEGORY, item.category),
    },
  };

  return transformed;
}

function InventoryItemRow({ item }) {
  const { id, name, price, description, category, stockAmount } =
    transformItem(item);

  return (
    <Table.Row>
      <Table.Column.Name>{name}</Table.Column.Name>
      <Table.Column.Amount>{price}</Table.Column.Amount>
      <Table.Column.Description>{description}</Table.Column.Description>
      <Tag type={category.tag}>{category.name}</Tag>
      <Table.Column.Amount>{stockAmount}</Table.Column.Amount>

      <Menus.Menu>
        <Menus.Toggle id={id} />
        <Menus.List id={id}>
          <Menus.Button icon={<HiEye />}>Xem chi tiết</Menus.Button>
          <Menus.Button icon={<HiPencil />}>Chỉnh sửa</Menus.Button>
          <Menus.Button icon={<HiMiniArrowLeftOnRectangle />}>
            Nhập kho
          </Menus.Button>
          <Menus.Button icon={<HiMiniArrowRightOnRectangle />}>
            Xuất kho
          </Menus.Button>
          <Menus.Button icon={<HiTrash />}>Xóa thông tin</Menus.Button>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default InventoryItemRow;

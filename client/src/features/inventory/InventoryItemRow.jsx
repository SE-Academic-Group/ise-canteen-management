import {
  HiMiniArrowLeftOnRectangle,
  HiMiniArrowRightOnRectangle,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Tag from "../../ui/Tag";

import { translator } from "../../utils/translator";
import EditInventoryItemForm from "./EditInventoryItemForm";

const categoryToTagName = {
  ingredient: "green",
  spice: "red",
  drink: "blue",
  other: "grey",
};

function transformItem(item) {
  const transformed = {
    ...item,
    // stockAmount:
    //   item.stockAmount + " " + translator('unit', item.unit),
    stockAmount: item.stockAmount + " " + item.unit,
    category: {
      tag: categoryToTagName[item.category],
      name: translator("category", item.category),
    },
  };

  return transformed;
}

function InventoryItemRow({ item }) {
  const { _id, name, price, description, category, stockAmount } =
    transformItem(item);

  return (
    <Table.Row>
      <Table.Column.Name>{name}</Table.Column.Name>
      <Table.Column.Amount>{price}</Table.Column.Amount>
      <Table.Column.Description>
        {description ?? "Không có mô tả"}
      </Table.Column.Description>
      <Tag type={category.tag}>{category.name}</Tag>
      <Table.Column.Text>{stockAmount}</Table.Column.Text>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={_id} />
          <Menus.List id={_id}>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Chỉnh sửa</Menus.Button>
            </Modal.Open>
            <Menus.Button icon={<HiMiniArrowLeftOnRectangle />}>
              Nhập kho
            </Menus.Button>
            <Menus.Button icon={<HiMiniArrowRightOnRectangle />}>
              Xuất kho
            </Menus.Button>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Xóa thông tin</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="edit">
          <EditInventoryItemForm itemToEdit={item} />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="thông tin kho liệu"
            disabled={true}
            // onConfirm={() => deleteUser(_id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default InventoryItemRow;

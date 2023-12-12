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
import EditInventoryItemForm from "./EditInventoryItemForm";

import { translator } from "../../utils/translator";
import { CATEGORY_TAGS } from "../../constants/tags";

function InventoryItemRow({ item }) {
  const { _id, name, price, description, category, stockAmount } = item;
  const tag = CATEGORY_TAGS[category] ?? { type: "grey", label: "Khác" };
  const stockDesc = stockAmount + " " + translator("unit", item.unit);

  return (
    <Table.Row>
      <Table.Column.Name>{name}</Table.Column.Name>
      <Table.Column.Amount>{price}</Table.Column.Amount>
      <Table.Column.Description>
        {description ?? "Không có mô tả"}
      </Table.Column.Description>
      <Tag type={tag.type}>{tag.label}</Tag>
      <Table.Column.Text>{stockDesc}</Table.Column.Text>

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

import { HiEye, HiCheckBadge, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

import {
  formatDateTime,
  formatVietnameseCurrency,
  padString,
} from "../../utils/helpers";

const Serial = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Amount = styled.div`
  font-weight: 500;
`;

function UserRow({ order: { id, username, total, status, createdAt, items } }) {
  const statusToTagName = {
    completed: "blue",
    cancelled: "indigo",
    pending: "silver",
  };

  return (
    <Table.Row>
      <Serial>{padString(id, 3)}</Serial>

      <span>{username}</span>

      <span>{formatDateTime(createdAt)}</span>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Stacked>
        {items.map((i) => i.quantity + " " + i.name).join(", ")}
      </Stacked>

      <Amount>{formatVietnameseCurrency(total)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button icon={<HiEye />}>Xem chi tiết</Menus.Button>

            <Modal.Open opens="update">
              <Menus.Button icon={<HiCheckBadge />}>Sẵn sàng</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Hủy đơn hàng</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="đơn hàng"
            disabled={false}
            onConfirm={() => console.log("delete order")}
          />
        </Modal.Window>

        <Modal.Window name="update">
          <p>Update user account form</p>
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default UserRow;

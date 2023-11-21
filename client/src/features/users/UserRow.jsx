import styled from "styled-components";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi2";

import { useNavigate } from "react-router-dom";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

import {
  formatVietnameseCurrency,
  formatVietnamesePhoneNumber,
  padString,
} from "../../utils/helpers";

const Serial = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

const Img = styled.img`
  display: block;
  width: 64px;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

function UserRow({
  user: { id, username, email, avatar, phone, role, balance },
}) {
  // const navigate = useNavigate();
  const roleToTagName = {
    admin: "blue",
    customer: "indigo",
    staff: "silver",
    cashier: "green",
  };

  return (
    <Table.Row>
      <Serial>{padString(id, 3)}</Serial>

      <Img width={64} height={43} src={avatar} alt={"avatar of " + username} />

      <Stacked>
        <span>{username}</span>
        <span>{email}</span>
      </Stacked>

      <span>{formatVietnamesePhoneNumber(phone)}</span>

      <Tag type={roleToTagName[role]}>{role.replace("-", " ")}</Tag>

      <Amount>{formatVietnameseCurrency(balance)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button icon={<HiEye />}>Xem chi tiết</Menus.Button>

            <Modal.Open opens="update">
              <Menus.Button icon={<HiPencil />}>Cập nhật</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Xóa tài khoản</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="tài khoản"
            disabled={false}
            onConfirm={() => console.log("delete user")}
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

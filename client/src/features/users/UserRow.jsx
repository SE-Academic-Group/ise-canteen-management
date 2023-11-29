import { HiPencil, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

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
import { roleToVietnamese } from "../../utils/translator";

import { useDeleteUser } from "./useDeleteUser";
import { Fragment } from "react";
import CreateUserForm from "./CreateUserForm";

const Number = styled.div`
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  overflow: hidden;

  & span {
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-weight: 500;
  position: relative;
`;

const Img = styled.img`
  display: block;
  width: 48px;
  aspect-ratio: 1 / 1;
  margin-block: 0.8rem;
  border-radius: 2px;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  background-color: var(--color-grey-200);
  font-size: 0.8rem;
  font-style: italic;
`;

const NoImg = styled.div`
  display: block;
  width: 48px;
  aspect-ratio: 1 / 1;
  margin-block: 0.8rem;
  border-radius: 2px;
  transform: scale(1.5) translateX(-7px);
  background-color: var(--color-brand-500);
  color: white;
  outline: 2px solid var(--color-grey-100);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const roleToTagName = {
  admin: "blue",
  customer: "indigo",
  staff: "silver",
  cashier: "green",
};

function UserRow({ user, serial }) {
  const { deleteUser, isDeleting } = useDeleteUser();

  const { id, name, email, avatar, phone, role, balance } = user;

  return (
    <Table.Row>
      <Number>{padString(serial, 3)}</Number>

      {avatar ? (
        <Img src={avatar} alt={"Avatar of " + name} />
      ) : (
        <NoImg>{name.at(0) ?? "%"}</NoImg>
      )}

      <Stacked>
        <span>{name}</span>
        <span>{email}</span>
      </Stacked>

      <Number>{formatVietnamesePhoneNumber(phone)}</Number>

      <Tag type={roleToTagName[role]}>{roleToVietnamese(role)}</Tag>

      <Amount>
        {role === "customer" ? (
          formatVietnameseCurrency(balance)
        ) : (
          <Fragment>
            <span className="sr-only">No balance</span>
            <span role="presentation">____</span>
          </Fragment>
        )}
      </Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="update">
              <Menus.Button icon={<HiPencil />}>Cập nhật</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Xóa tài khoản</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="update">
          <CreateUserForm userToEdit={user} />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="tài khoản"
            disabled={isDeleting}
            onConfirm={() => deleteUser(id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default UserRow;

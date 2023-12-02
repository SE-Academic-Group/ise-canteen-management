import { HiPencil, HiTrash } from "react-icons/hi2";

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
import CreateUserForm from "./CreateUserForm";
import { useDeleteUser } from "./useDeleteUser";

const roleToTagName = {
  admin: "blue",
  customer: "indigo",
  staff: "silver",
  cashier: "green",
};

function transformUser(user) {
  const transformed = {
    ...user,
    number: padString(user.serial, 3),
    role: {
      tag: roleToTagName[user.role],
      name: roleToVietnamese(user.role),
      value: user.role,
    },
    phone: formatVietnamesePhoneNumber(user.phone),
    balance: formatVietnameseCurrency(user.balance),
  };

  return transformed;
}

function UserRow({ user, serial }) {
  const { deleteUser, isDeleting } = useDeleteUser();

  const { id, name, email, avatar, phone, role, balance, number } =
    transformUser({
      ...user,
      serial,
    });

  return (
    <Table.Row>
      <Table.Column.Number>{number}</Table.Column.Number>
      {avatar ? (
        <Table.Column.Thumbnail src={avatar} alt={"Avatar of " + name} />
      ) : (
        <Table.Column.NoThumbnail>{name.at(0) ?? "%"}</Table.Column.NoThumbnail>
      )}
      <Table.Column.Stacked>
        <span>{name}</span>
        <span>{email}</span>
      </Table.Column.Stacked>
      <Table.Column.Number>{phone}</Table.Column.Number>
      <Tag type={role.tag}>{role.name}</Tag>
      <Table.Column.Amount>
        {role.value === "customer" ? (
          balance
        ) : (
          <>
            <span className="sr-only">No balance</span>
            <span role="presentation">____</span>
          </>
        )}
      </Table.Column.Amount>

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

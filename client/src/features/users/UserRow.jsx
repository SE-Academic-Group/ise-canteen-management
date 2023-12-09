import { HiPencil, HiTrash } from "react-icons/hi2";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import SpinnerMini from "../../ui/SpinnerMini";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

import { TRANSLATOR_KEYS, translator } from "../../utils/translator";
import { useUser } from "../authentication/useUser";
import EditUserForm from "./EditUserForm";
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
    role: {
      tag: roleToTagName[user.role],
      name: translator(TRANSLATOR_KEYS.ROLE, user.role),
      value: user.role,
    },
    image: `https://ui-avatars.com/api/?name=${user.name}&background=random&rounded=true&size=48&font-size=0.33&bold=true&color=fff&length=1`,
  };

  return transformed;
}

function UserRow({ user, serial }) {
  const { deleteUser, isDeleting } = useDeleteUser();
  const { user: currentUser, isLoading } = useUser();
  const isCurrentUser = currentUser._id === user._id;

  if (isLoading) {
    return <SpinnerMini />;
  }

  const { _id, name, email, image, phone, role, balance } = transformUser(user);

  return (
    <Table.Row>
      <Table.Column.Serial>{serial}</Table.Column.Serial>
      <Table.Column.Thumbnail
        src={image}
        alt={"Avatar of " + name}
        placeholder={name.at(0) ?? "%"}
      />
      <Table.Column.Stacked>
        <span>{name}</span>
        <span>{email}</span>
      </Table.Column.Stacked>
      <Table.Column.Phone>{phone}</Table.Column.Phone>
      <Tag type={role.tag}>{role.name}</Tag>
      {role.value === "customer" ? (
        <Table.Column.Amount>{balance}</Table.Column.Amount>
      ) : (
        <>
          <span className="sr-only">No balance</span>
          <span role="presentation">___ ___ __ </span>
        </>
      )}

      {!isCurrentUser && (
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={_id} />
            <Menus.List id={_id}>
              <Modal.Open opens="update">
                <Menus.Button icon={<HiPencil />}>Cập nhật</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Xóa tài khoản</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="update">
            <EditUserForm userToEdit={user} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="tài khoản"
              disabled={isDeleting}
              onConfirm={() => deleteUser(_id)}
            />
          </Modal.Window>
        </Modal>
      )}
    </Table.Row>
  );
}

export default UserRow;

import { HiPencil, HiTrash } from "react-icons/hi2";

import ConfirmDelete from "../../ui/ConfirmDelete";
import SpinnerMini from "../../ui/SpinnerMini";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import EditUserForm from "./EditUserForm";

import { useUser } from "../authentication/useUser";
import { useDeleteUser } from "./useDeleteUser";
import { ROLE_TAGS } from "../../constants/tags";

function UserRow({ user, serial }) {
  const { deleteUser, isDeleting } = useDeleteUser();
  const { user: currentUser, isLoading } = useUser();
  const isCurrentUser = currentUser._id === user._id;

  if (isLoading) {
    return <SpinnerMini />;
  }

  const { _id, name, email, image, phone, role, balance } = user;
  const tag = ROLE_TAGS[role];

  return (
    <Table.Row>
      <Table.Column.Serial>{serial}</Table.Column.Serial>
      <Table.Column.Thumbnail
        src={`https://ui-avatars.com/api/?name=${user.name}&background=random&rounded=true&size=48&font-size=0.33&bold=true&color=fff&length=1`}
        alt={"Avatar of " + name}
      />
      <Table.Column.Stacked>
        <span>{name}</span>
        <span>{email}</span>
      </Table.Column.Stacked>
      <Table.Column.Phone>{phone}</Table.Column.Phone>
      <Tag type={tag.type}>{tag.label}</Tag>
      <Table.Column.Amount>
        {role.value === "customer" ? balance : null}
      </Table.Column.Amount>

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

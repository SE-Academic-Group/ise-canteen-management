import { useUsers } from "./useUsers";

import Progressing from "../../ui/Progressing";
import Pagination from "../../ui/Pagination";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import UserRow from "./UserRow";

export default function UserTable() {
  const state = useUsers();
  const { users, count } = state;

  return (
    <Progressing {...state} resourceName="Tài khoản">
      <Menus>
        <Table columns="12ch 80px 1fr 16ch 20ch 12ch 14ch 3.2rem">
          <Table.Header>
            <div>STT</div>
            <div>Ảnh</div>
            <div>Thông tin</div>
            <div>SDT</div>
            <div>Phân quyền</div>
            <div>Số dư</div>
            <div>Trạng thái</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={users}
            render={(user, i) => (
              <UserRow key={user._id} user={user} serial={i + 1} />
            )}
          />

          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        </Table>
      </Menus>
    </Progressing>
  );
}

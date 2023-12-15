import { useUsers } from "./useUsers";

import ErrorLoading from "../../ui/ErrorLoading";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import UserRow from "./UserRow";

export default function UserTable() {
  const { isLoading, error, count, users } = useUsers();

  if (error) return <ErrorLoading error={error} />;

  if (isLoading) return <Spinner />;

  if (!count) return <Empty resourceName="Tài khoản" />;

  return (
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
  );
}

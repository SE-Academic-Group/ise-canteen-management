import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import UserRow from "./UserRow";
import users from "./mockUsers";

export default function UserTable() {
  const isLoading = false;
  const length = 2;

  if (isLoading) return <Spinner />;

  if (!length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 0.8fr 1.2fr 16ch 0.8fr 1.2fr 3.2rem">
        <Table.Header>
          <div>STT</div>
          <div>Ảnh</div>
          <div>Thông tin</div>
          <div>SDT</div>
          <div>Phân quyền</div>
          <div>Số dư</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={users}
          render={(user) => <UserRow key={user.id} user={user} />}
        />

        <Table.Footer>
          <Pagination count={55} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

import UserTable from "../features/users/UserTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Users() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Quản lý người dùng</Heading>
        <div>operations</div>
      </Row>

      <UserTable />
    </>
  );
}

export default Users;

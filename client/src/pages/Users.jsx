import AddUser from "../features/users/AddUser";
import UserTable from "../features/users/UserTable";
import UserTableOperations from "../features/users/UserTableOperations";
import BackgroundHeading from "../ui/BackgroundHeading";

function Users() {
  return (
    <>
      <BackgroundHeading as="h1">Quản lý người dùng</BackgroundHeading>
      <UserTableOperations />
      <UserTable />
      <AddUser />
    </>
  );
}

export default Users;

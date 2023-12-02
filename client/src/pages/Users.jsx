import AddUser from "../features/users/AddUser";
import UserTable from "../features/users/UserTable";
import UserTableOperations from "../features/users/UserTableOperations";
import PageHeading from "../ui/PageHeading";

function Users() {
  return (
    <>
      <PageHeading>Quản lý người dùng</PageHeading>
      <UserTableOperations />
      <UserTable />
      <AddUser />
    </>
  );
}

export default Users;

import TableOperations from "../../ui/TableOperations";
import SearchBox from "../../ui/SearchBox";
import Filter from "../../ui/Filter";

function UserTableOperations() {
  return (
    <TableOperations between>
      <Filter
        filterField="role"
        options={[
          { value: "all", label: "Tất cả" },
          { value: "admin", label: "Admin" },
          { value: "staff", label: "Nhân viên" },
          { value: "cashier", label: "Thu ngân" },
          { value: "customer", label: "Khách hàng" },
        ]}
      />
      <SearchBox />
    </TableOperations>
  );
}

export default UserTableOperations;

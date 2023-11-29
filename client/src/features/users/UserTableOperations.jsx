import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

function UserTableOperations() {
  return (
    <TableOperations>
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
    </TableOperations>
  );
}

export default UserTableOperations;

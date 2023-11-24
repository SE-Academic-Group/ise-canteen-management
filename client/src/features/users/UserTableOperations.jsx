import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

import CreateUserForm from "./CreateUserForm";

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

      <Modal>
        <Modal.Open>
          <Button>Tạo tài khoản</Button>
        </Modal.Open>

        <Modal.Window>
          <CreateUserForm />
        </Modal.Window>
      </Modal>
    </TableOperations>
  );
}

export default UserTableOperations;

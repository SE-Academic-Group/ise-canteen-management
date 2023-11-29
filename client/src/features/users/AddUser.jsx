import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateUserForm from "./CreateUserForm";

function AddUser() {
  return (
    <div>
      <Modal>
        <Modal.Open>
          <Button>Tạo tài khoản</Button>
        </Modal.Open>

        <Modal.Window>
          <CreateUserForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddUser;

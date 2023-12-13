import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateInventoryItemForm from "./CreateInventoryItemForm";

export default function AddInventoryItem() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="create-item">
          <Button>Thêm hàng</Button>
        </Modal.Open>

        <Modal.Window name="create-item">
          <CreateInventoryItemForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

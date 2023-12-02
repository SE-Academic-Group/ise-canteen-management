import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateInventoryItemForm from "./CreateInventoryItemForm";

export default function AddInventoryItem() {
  return (
    <div>
      <Modal>
        <Modal.Open>
          <Button>Thêm hàng</Button>
        </Modal.Open>

        <Modal.Window>
          <CreateInventoryItemForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

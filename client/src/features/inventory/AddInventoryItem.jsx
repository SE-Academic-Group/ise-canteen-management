import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

export default function AddInventoryItem() {
  return (
    <div>
      <Modal>
        <Modal.Open>
          <Button>Thêm hàng</Button>
        </Modal.Open>

        <Modal.Window>
          <div>Them hang</div>
        </Modal.Window>
      </Modal>
    </div>
  );
}

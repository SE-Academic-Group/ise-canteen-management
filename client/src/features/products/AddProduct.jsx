import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

export default function AddProduct() {
  return (
    <div>
      <Modal>
        <Modal.Open>
          <Button>Thêm sản phẩm</Button>
        </Modal.Open>

        <Modal.Window>
          <div>create new product</div>
        </Modal.Window>
      </Modal>
    </div>
  );
}

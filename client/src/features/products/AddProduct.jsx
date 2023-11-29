import CreateProductForm from "./CreateProductForm";
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
          <CreateProductForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

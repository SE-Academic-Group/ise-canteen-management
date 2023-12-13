import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import FlexContainer from "../../ui/FlexContainer";
import CreateInventoryItemForm from "./CreateInventoryItemForm";

export default function AddInventoryItem() {
  return (
    <div>
      <Modal>
        <FlexContainer>
          <Modal.Open opens="create-item">
            <Button>Thêm hàng</Button>
          </Modal.Open>
          <Modal.Open opens="import-items">
            <Button>Nhập lô hàng</Button>
          </Modal.Open>
          <Modal.Open opens="export-items">
            <Button>Xuất lô hàng</Button>
          </Modal.Open>
        </FlexContainer>

        <Modal.Window name="create-item">
          <CreateInventoryItemForm />
        </Modal.Window>

        <Modal.Window name="import-items">
          <div>Import</div>
        </Modal.Window>

        <Modal.Window name="export-items">
          <div>Import</div>
        </Modal.Window>
      </Modal>
    </div>
  );
}

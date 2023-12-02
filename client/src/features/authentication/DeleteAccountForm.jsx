import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Modal from "../../ui/Modal";

function DeleteAccountForm() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow hasButton>
        <Modal>
          <Modal.Open>
            <Button variation="danger">Ngưng hoạt động tài khoản</Button>
          </Modal.Open>

          <Modal.Window>
            <ConfirmDelete
              title="Dừng hoạt động"
              description="Bạn có chắc muốn dừng hoạt động của tài khoản này không"
            />
          </Modal.Window>
        </Modal>
      </FormRow>
    </Form>
  );
}

export default DeleteAccountForm;

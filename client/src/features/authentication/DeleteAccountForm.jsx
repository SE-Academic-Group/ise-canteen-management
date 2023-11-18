import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Form from "../../ui/Form";

function DeleteAccountForm() {
  function handleSubmit() {
    // display alert box to confirm
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow hasButton>
        <Button variation="danger">Xóa tài khoản</Button>
      </FormRow>
    </Form>
  );
}

export default DeleteAccountForm;

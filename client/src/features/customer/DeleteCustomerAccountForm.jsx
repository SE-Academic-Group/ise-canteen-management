import { useDeactivateAccount } from "../authentication/useDeactivateAccount";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Form from "../../ui/Form";

function DeleteCustomerAccountForm() {
  const { isDeactivating, deactivateAccount } = useDeactivateAccount();

  function handleSubmit(e) {
    e.preventDefault();

    const passwordConfirm = window.prompt(
      "Bạn có chắc chắn muốn ngưng hoạt động tài khoản?, Hãy nhập mật khẩu để xác nhận."
    );

    if (passwordConfirm) {
      deactivateAccount({ passwordConfirm });
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <p>Tài khoản của bạn sẽ bị tạm khóa.</p>
        <p>Bạn có thể liên hệ với cantin để khôi phục tài khoản.</p>
      </div>
      <FormRow hasButton>
        <Button variation="danger" disabled={isDeactivating}>
          Ngưng hoạt động tài khoản
        </Button>
      </FormRow>
    </Form>
  );
}

export default DeleteCustomerAccountForm;

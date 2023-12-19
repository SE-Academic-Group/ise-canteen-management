import { useUser } from "../features/authentication/useUser";
import DeleteCustomerAccountForm from "../features/customer/DeleteCustomerAccountForm";
import UpdateCustomerDataForm from "../features/customer/UpdateCustomerDataForm";
import UpdateCustomerPasswordForm from "../features/customer/UpdateCustomerPasswordForm";

import BackgroundHeading from "../ui/BackgroundHeading";
import Heading from "../ui/Heading";
import Spinner from "../ui/Spinner";
import Row from "../ui/Row";

function CustomerAccount() {
  const { isLoading, user } = useUser();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackgroundHeading as="h1" small>
        Cập nhật thông tin tài khoản
      </BackgroundHeading>
      <Row>
        <Heading as="h2">Thông tin tài khoản</Heading>
        <UpdateCustomerDataForm user={user} />
      </Row>
      <Row>
        <Heading as="h2">Mật khẩu</Heading>
        <UpdateCustomerPasswordForm />
      </Row>
      <Row>
        <Heading danger as="h2">
          Mật khẩu
        </Heading>
        <DeleteCustomerAccountForm />
      </Row>
    </>
  );
}

export default CustomerAccount;

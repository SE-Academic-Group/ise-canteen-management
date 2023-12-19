import { useUser } from "../features/authentication/useUser";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import DeleteCustomerAccountForm from "../features/customer/DeleteCustomerAccountForm";

import BackgroundHeading from "../ui/BackgroundHeading";
import Heading from "../ui/Heading";
import Spinner from "../ui/Spinner";
import Row from "../ui/Row";

function Account() {
  const { isLoading, user } = useUser();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackgroundHeading as="h1">
        Cập nhật thông tin tài khoản
      </BackgroundHeading>
      <Row>
        <Heading as="h3">Thông tin người dùng</Heading>
        <UpdateUserDataForm user={user} />
      </Row>
      <Row>
        <Heading as="h3">Mật khẩu</Heading>
        <UpdatePasswordForm />
      </Row>

      {user.role === "customer" && (
        <>
          <Heading danger as="h2">
            Mật khẩu
          </Heading>
          <DeleteCustomerAccountForm />
        </>
      )}
    </>
  );
}

export default Account;

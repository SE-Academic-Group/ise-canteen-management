import DeleteAccountForm from "../features/authentication/DeleteAccountForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import { useUser } from "../features/authentication/useUser";
import BackgroundHeading from "../ui/BackgroundHeading";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";

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
      <Row>
        <Heading danger as="h3">
          Vùng nguy hiểm
        </Heading>
        <DeleteAccountForm />
      </Row>
    </>
  );
}

export default Account;

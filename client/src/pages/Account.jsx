import DeleteAccountForm from "../features/authentication/DeleteAccountForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import BackgroundHeading from "../ui/BackgroundHeading";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <BackgroundHeading as="h1">
        Cập nhật thông tin tài khoản
      </BackgroundHeading>
      <Row>
        <Heading as="h3">Thông tin người dùng</Heading>
        <UpdateUserDataForm />
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

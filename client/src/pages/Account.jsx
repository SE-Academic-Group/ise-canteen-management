import styled from "styled-components";

import DeleteAccountForm from "../features/authentication/DeleteAccountForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const DangerHeading = styled(Heading)`
  color: var(--color-red-700);
`;

function Account() {
  return (
    <>
      <Heading as="h1">Cập nhật thông tin tài khoản</Heading>
      <Row>
        <Heading as="h3">Thông tin người dùng</Heading>
        <UpdateUserDataForm />
      </Row>
      <Row>
        <Heading as="h3">Mật khẩu</Heading>
        <UpdatePasswordForm />
      </Row>
      <Row>
        <DangerHeading as="h3">Vùng nguy hiểm</DangerHeading>
        <DeleteAccountForm />
      </Row>
    </>
  );
}

export default Account;

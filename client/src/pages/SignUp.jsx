import styled from "styled-components";

import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

const LoginLayout = styled.main`
  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  grid-template-columns: min(56rem, 94%);
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  overflow: auto;
  padding-block: 4rem;
`;

function SignUp() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Đăng ký tài khoản</Heading>
      <SignupForm />
    </LoginLayout>
  );
}

export default SignUp;

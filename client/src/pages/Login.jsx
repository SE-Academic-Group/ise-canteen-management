import { Navigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";

import LoginForm from "../features/authentication/LoginForm";
import FullPageSpinner from "../ui/FullPageSpinner";
import FormLayout from "../ui/FormLayout";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

function Login() {
  const { isLoading, isAuthenticated } = useUser();

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <FormLayout>
      <Logo />
      <Heading as="h4">Đăng nhập vào hệ thống</Heading>
      <LoginForm />
    </FormLayout>
  );
}

export default Login;

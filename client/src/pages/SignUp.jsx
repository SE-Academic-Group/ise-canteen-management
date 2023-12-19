import SignupForm from "../features/authentication/SignupForm";
import FormLayout from "../ui/FormLayout";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

function SignUp() {
  return (
    <FormLayout>
      <Logo />
      <Heading as="h4">Đăng ký tài khoản</Heading>
      <SignupForm />
    </FormLayout>
  );
}

export default SignUp;

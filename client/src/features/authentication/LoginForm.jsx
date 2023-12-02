import { useForm } from "react-hook-form";

import FocusTrap from "focus-trap-react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";

function LoginForm() {
  const { login, isLoading } = useLogin();
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { errors } = formState;

  function onSubmit({ email, password }) {
    login({ email, password });
  }

  return (
    <FocusTrap>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRowVertical label="Email" error={errors.email?.message}>
          <Input
            type="email"
            id="email"
            autoComplete="email"
            disabled={isLoading}
            {...register("email", {
              required: "Email không được để trống",
            })}
          />
        </FormRowVertical>

        <FormRowVertical label="Mật khẩu" error={errors.password?.message}>
          <Input
            type="password"
            id="password"
            disabled={isLoading}
            autoComplete="current-password"
            {...register("password", {
              required: "Mật khẩu không được để trống",
            })}
          />
        </FormRowVertical>
        <FormRowVertical>
          <Button size="large">
            {isLoading ? <SpinnerMini /> : "Đăng nhập"}
          </Button>
        </FormRowVertical>
      </Form>
    </FocusTrap>
  );
}

export default LoginForm;

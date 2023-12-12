import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";

import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import CheckBox from "../../ui/CheckBox";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

function LoginForm() {
  const { login, isLoading } = useLogin();
  const [isEmailRemembered, setIsEmailRemembered] = useState(
    localStorage.getItem("email") ? true : false
  );
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: localStorage.getItem("email") ?? "",
      password: "test1234", // TODO: Remove this
    },
  });
  const { errors } = formState;

  function onSubmit({ email, password }) {
    login({ email, password });

    if (isEmailRemembered) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }
  }

  return (
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
        <CheckBox
          id="remember-me"
          checked={isEmailRemembered}
          onChange={(e) => setIsEmailRemembered((val) => !val)}
        >
          Nhớ email
        </CheckBox>
      </FormRowVertical>

      <FormRowVertical>
        <Button size="large">
          {isLoading ? <SpinnerMini /> : "Đăng nhập"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;

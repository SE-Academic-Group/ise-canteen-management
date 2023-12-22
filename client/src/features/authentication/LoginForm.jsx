import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./useLogin";

import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import CheckBox from "../../ui/CheckBox";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import { FORM_RULES } from "../../constants/form";

function LoginForm() {
  const navigate = useNavigate();
  const { login, isLoading } = useLogin();
  const [isEmailRemembered, setIsEmailRemembered] = useState(
    localStorage.getItem("email") ? true : false
  );
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: localStorage.getItem("email") ?? "",
      password: "",
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
          {...register("email", FORM_RULES.EMAIL)}
        />
      </FormRowVertical>

      <FormRowVertical label="Mật khẩu" error={errors.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          autoComplete="current-password"
          {...register("password", FORM_RULES.PASSWORD)}
        />
      </FormRowVertical>

      <FormRowVertical>
        <CheckBox
          id="remember-me"
          checked={isEmailRemembered}
          onChange={(e) => setIsEmailRemembered((val) => !val)}
        >
          Nhớ email cho lần đăng nhập sau
        </CheckBox>
      </FormRowVertical>

      <FormRow hasButton>
        <Button disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Đăng nhập"}
        </Button>
        <Button
          disabled={isLoading}
          type="button"
          variation="secondary"
          onClick={() => navigate("/signup")}
        >
          Đăng ký
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;

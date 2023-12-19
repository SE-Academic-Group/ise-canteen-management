import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignup } from "./useSignup";

import FormRowVertical from "../../ui/FormRowVertical";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import { FORM_RULES } from "../../constants/form";

function SignupForm() {
  const navigate = useNavigate();
  const { isLoading, signup } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    mode: "onBlur",
  });
  const { errors } = formState;

  function onSubmit(data) {
    function onSuccess() {
      reset();
    }

    signup(data, { onSuccess });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Tên người dùng" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          autoComplete="name"
          {...register("name", FORM_RULES.FULL_NAME)}
        />
      </FormRowVertical>

      <FormRowVertical label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          autoComplete="email"
          disabled={isLoading}
          {...register("email", FORM_RULES.EMAIL)}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Mật khẩu (Tối thiểu 8 ký tự)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", FORM_RULES.PASSWORD)}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Nhập lại mật khẩu"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "Mật khẩu không được để trống",
            validate: (value) =>
              value === getValues().password || "Mật khẩu không khớp",
          })}
        />
      </FormRowVertical>

      <FormRow hasButton>
        <Button disabled={isLoading}>Đăng ký</Button>
        <Button
          type="button"
          variation="secondary"
          disabled={isLoading}
          onClick={() => navigate("/login")}
        >
          Đăng nhập
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;

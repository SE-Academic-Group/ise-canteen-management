import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ password }) {
    console.log("UpdatePasswordForm", { password });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Mật khẩu mới (tối thiểu 8 ký tự)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          {...register("password", {
            required: "Mật khẩu không được để trống",
            minLength: {
              value: 8,
              message: "Mật khẩu phải có ít nhất 8 ký tự",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Nhập lại mật khẩu mới"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Mật khẩu không được để trống",
            validate: (value) =>
              getValues().password === value || "Mật khẩu không khớp",
          })}
        />
      </FormRow>
      <FormRow hasButton>
        <Button onClick={reset} type="reset" variation="secondary">
          Hủy
        </Button>
        <Button>Lưu thay đổi</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;

import { useForm } from "react-hook-form";
import { useUpdatePassword } from "../authentication/useUpdatePassword";

import FormRowVertical from "../../ui/FormRowVertical";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

function UpdateCustomerPasswordForm() {
  const { isUpdating, updatePassword } = useUpdatePassword();
  const { register, handleSubmit, formState, getValues, reset } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
  });
  const { errors } = formState;

  function onSubmit(data) {
    function onSuccess(data) {
      reset();
    }

    updatePassword(data, { onSuccess });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Mật khẩu cũ" error={errors?.oldPassword?.message}>
        <Input
          type="password"
          disabled={isUpdating}
          id="old-password"
          {...register("oldPassword", {
            required: "Mật khẩu không được để trống",
          })}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Mật khẩu mới (tối thiểu 8 ký tự)"
        error={errors?.newPassword?.message}
      >
        <Input
          type="password"
          disabled={isUpdating}
          id="password"
          {...register("newPassword", {
            required: "Mật khẩu không được để trống",
            minLength: {
              value: 8,
              message: "Mật khẩu phải có ít nhất 8 ký tự",
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Nhập lại mật khẩu mới"
        error={errors?.newPasswordConfirm?.message}
      >
        <Input
          type="password"
          disabled={isUpdating}
          id="passwordConfirm"
          {...register("newPasswordConfirm", {
            required: "Mật khẩu không được để trống",
            validate: (value) =>
              getValues().newPassword === value || "Mật khẩu không khớp",
          })}
        />
      </FormRowVertical>
      <FormRow hasButton>
        <Button
          onClick={reset}
          type="reset"
          variation="secondary"
          disabled={isUpdating}
        >
          Hủy
        </Button>
        <Button disabled={isUpdating}>Lưu thay đổi</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateCustomerPasswordForm;

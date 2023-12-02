import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import { FORM_RULES } from "../../utils/constants";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm({ user }) {
  const { isUpdating, updateUser } = useUpdateUser();
  const defaultValues = {
    name: user.name,
    phone: user.phone,
  };
  const { handleSubmit, register, reset, formState } = useForm({
    defaultValues,
  });
  const { errors, isDirty, isSubmitting } = formState;
  const isCustomer = user.role === "customer";
  const isWorking = isUpdating || isSubmitting;

  function onSubmit(data) {
    updateUser(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email">
        <Input value={user.email} disabled type="email" />
      </FormRow>
      <FormRow label="Tên người dùng" error={errors.name?.message}>
        <Input
          type="text"
          disabled={!isCustomer || isWorking}
          {...register("name", FORM_RULES.FULL_NAME)}
        />
      </FormRow>
      <FormRow label="Số điện thoại" error={errors.phone?.message}>
        <Input
          type="tel"
          disabled={!isCustomer || isWorking}
          maxLength={10}
          {...register("phone", FORM_RULES.PHONE)}
        />
      </FormRow>
      <FormRow label="Ảnh đại diện">
        <FileInput disabled={isWorking} id="avatar" accept="image/*" />
      </FormRow>

      <FormRow hasButton>
        <Button
          type="button"
          variation="secondary"
          disabled={!isDirty || isWorking}
          onClick={() => reset(defaultValues)}
        >
          Hủy
        </Button>
        <Button disabled={!isDirty || isWorking}>Lưu thay đổi</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;

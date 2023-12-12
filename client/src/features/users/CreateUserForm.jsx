import { useForm } from "react-hook-form";
import { useCreateUser } from "./useCreateUser";

import FormHeading from "../../ui/FormHeading";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

import { FORM_RULES } from "../../constants/form";
import { ROLE_OPTIONS } from "../../constants/options";
import { generatePasswordFromEmail } from "../../utils/helpers";

function CreateUserForm({ onCloseModal = () => {} }) {
  const { isCreating, createUser } = useCreateUser();

  const { register, handleSubmit, reset, formState, watch } = useForm({
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      role: "customer",
      password: "",
    },
  });
  const { errors } = formState;

  function onSubmit(data) {
    function onSuccess(data) {
      reset();
      onCloseModal();
    }

    const formData = {
      ...data,
      password: generatePasswordFromEmail(data.email),
    };
    createUser(formData, { onSuccess });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormHeading as="h2">Thêm mới tài khoản</FormHeading>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          autoComplete="email"
          disabled={isCreating}
          {...register("email", FORM_RULES.EMAIL)}
        />
      </FormRow>
      <FormRow label="Hộ tên" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          autoComplete="name"
          disabled={isCreating}
          {...register("name", FORM_RULES.FULL_NAME)}
        />
      </FormRow>
      <FormRow label="Phân quyền" error={errors?.role?.message}>
        <Select
          id="role"
          disabled={isCreating}
          options={ROLE_OPTIONS}
          {...register("role")}
        />
      </FormRow>
      <FormRow label="Số điện thoại" error={errors?.phone?.message}>
        <Input
          type="tel"
          id="phone"
          autoComplete="phone"
          maxLength={10}
          disabled={isCreating}
          {...register("phone", FORM_RULES.PHONE)}
        />
      </FormRow>
      <FormRow label="Mật khẩu">
        <Input
          type="text"
          disabled
          value={generatePasswordFromEmail(watch("email"))}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Hủy
        </Button>
        <Button disabled={isCreating}>Tạo tài khoản</Button>
      </FormRow>
    </Form>
  );
}

export default CreateUserForm;

import { useForm } from "react-hook-form";

import FormHeading from "../../ui/FormHeading";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";

import { FORM_RULES, USER_ROLES } from "../../utils/constants";
import { translator } from "../../utils/translator";
import { generatePasswordFromEmail } from "../../utils/helpers";
import { useCreateUser } from "./useCreateUser";

const selectOptions = USER_ROLES.map((r) => ({
  value: r,
  label: translator("role", r),
}));

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
          options={selectOptions}
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

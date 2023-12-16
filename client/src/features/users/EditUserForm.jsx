import { useForm } from "react-hook-form";
import { useEditUser } from "./useEditUser";

import FormHeading from "../../ui/FormHeading";
import FormRow from "../../ui/FormRow";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

import { FORM_RULES } from "../../constants/form";
import {
  ROLE_OPTIONS,
  USER_ACCOUNT_STATE_OPTIONS,
} from "../../constants/options";

function EditUserForm({ userToEdit = {}, onCloseModal = () => {} }) {
  const { isEditing, editUser } = useEditUser();

  const { _id: editId, active = true, ...editValues } = userToEdit;

  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: {
      email: editValues.email,
      name: editValues.name,
      phone: editValues.phone,
      role: editValues.role,
      status: active ? "active" : "inactive",
    },
  });
  const { errors } = formState;

  function onSubmit(data) {
    function onSuccess(data) {
      reset();
      onCloseModal();
    }

    const { status } = data;
    data.active = status === "active";
    delete data.status;

    editUser({ newUserData: data, id: editId }, { onSuccess });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormHeading as="h2">Cập nhật thông tin tài khoản</FormHeading>

      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          autoComplete="email"
          disabled
          value={getValues("email")}
        />
      </FormRow>

      <FormRow label="Hộ tên" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          autoComplete="name"
          disabled={isEditing}
          {...register("name", FORM_RULES.FULL_NAME)}
        />
      </FormRow>

      <FormRow label="Phân quyền" error={errors?.role?.message}>
        <Select
          id="role"
          disabled={isEditing}
          options={ROLE_OPTIONS}
          {...register("role")}
        />
      </FormRow>

      <FormRow label="Trạng thái" error={errors?.status?.message}>
        <Select
          id="status"
          disabled={isEditing}
          options={USER_ACCOUNT_STATE_OPTIONS}
          {...register("status")}
        />
      </FormRow>

      <FormRow label="Số điện thoại" error={errors?.phone?.message}>
        <Input
          type="tel"
          id="phone"
          autoComplete="phone"
          disabled={isEditing}
          maxLength={10}
          {...register("phone", FORM_RULES.PHONE)}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Hủy
        </Button>
        <Button disabled={isEditing}>Lưu thay đổi</Button>
      </FormRow>
    </Form>
  );
}

export default EditUserForm;

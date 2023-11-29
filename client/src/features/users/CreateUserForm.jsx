import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";

import { FORM_RULES, USER_ROLES } from "../../utils/constants";
import { roleToVietnamese } from "../../utils/translator";
import { useCreateUser } from "./useCreateUser";
import { useEditUser } from "./useEditUser";

const selectOptions = USER_ROLES.map((r) => ({
  value: r,
  label: roleToVietnamese(r),
}));

function CreateUserForm({ userToEdit = {}, onCloseModal }) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const { isCreating, createUser } = useCreateUser();
  const { isEditing, editUser } = useEditUser();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = userToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState, setValue } = useForm({
    defaultValues: isEditSession ? editValues : { role: "customer" },
  });
  const { errors } = formState;

  function onSubmit(data) {
    function onSuccess(data) {
      reset();
      onCloseModal && onCloseModal();
    }

    if (isEditSession) {
      editUser({ newUserData: data, id: editId }, { onSuccess });
    } else {
      createUser(data, { onSuccess });
    }
  }

  function generatePassword() {
    const newPass = Math.random().toString(36).slice(-8);
    setValue("password", newPass);
    setShowPassword(true);
  }

  useEffect(() => {
    if (!isEditSession) {
      generatePassword();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="email"
          id={"email" + id}
          disabled={isWorking}
          {...register("email", FORM_RULES.EMAIL)}
        />
      </FormRow>

      <FormRow label="Hộ tên" error={errors?.name?.message}>
        <Input
          type="text"
          id={"name" + id}
          disabled={isWorking}
          {...register("name", FORM_RULES.FULL_NAME)}
        />
      </FormRow>

      <FormRow label="Phân quyền" error={errors?.role?.message}>
        <Select
          id={"role" + id}
          disabled={isWorking}
          options={selectOptions}
          {...register("role")}
        />
      </FormRow>

      <FormRow label="Số điện thoại" error={errors?.phone?.message}>
        <Input
          type="tel"
          id={"phone" + id}
          disabled={isWorking}
          maxLength={10}
          {...register("phone", FORM_RULES.PHONE)}
        />
      </FormRow>

      <FormRow label="Mật khẩu">
        <Input
          type={showPassword ? "text" : "password"}
          disabled
          {...register("password", FORM_RULES.PASSWORD)}
        />
      </FormRow>

      {isEditSession && (
        <FormRow>
          <Button
            disabled={isWorking}
            variation="danger"
            type="button"
            onClick={generatePassword}
          >
            Làm mới mật khẩu
          </Button>
        </FormRow>
      )}

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Hủy
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Lưu thay đổi" : "Tạo tài khoản"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateUserForm;

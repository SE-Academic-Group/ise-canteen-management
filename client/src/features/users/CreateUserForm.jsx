import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

import { USER_ROLES } from "../../utils/constants";

import { useEditUser } from "./useEditUser";
import { useCreateUser } from "./useCreateUser";

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
          {...register("email", {
            required: "Email không được để trống",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email không hợp lệ",
            },
          })}
        />
      </FormRow>

      <FormRow label="Hộ tên" error={errors?.name?.message}>
        <Input
          type="text"
          id={"name" + id}
          disabled={isWorking}
          {...register("name", {
            required: "Tên không được để trống",
            min: {
              value: 3,
              message: "Tên phải có ít nhất 3 ký tự",
            },
            pattern: {
              value:
                /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$/gm,
              message: "Tên không hợp lệ",
            },
          })}
        />
      </FormRow>

      <FormRow label="Phân quyền" error={errors?.role?.message}>
        <Select
          id={"role" + id}
          disabled={isWorking}
          options={USER_ROLES.map((r) => ({
            value: r,
            label: r.replace("-", " "),
          }))}
          {...register("role")}
        />
      </FormRow>

      <FormRow label="Số điện thoại" error={errors?.phone?.message}>
        <Input
          type="tel"
          id={"phone" + id}
          disabled={isWorking}
          maxLength={10}
          {...register("phone", {
            pattern: {
              value: /^0[0-9]{9}$/,
              message: "Số điện thoại không hợp lệ",
            },
          })}
        />
      </FormRow>

      <FormRow label="Mật khẩu">
        {showPassword ? (
          <Input type="text" disabled {...register("password")} />
        ) : (
          <Input type="password" disabled {...register("password")} />
        )}
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

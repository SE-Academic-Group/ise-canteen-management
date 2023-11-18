import { useState } from "react";

import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

function UpdateUserDataForm() {
  const mockUser = {
    email: "mockEmail@gmail.com",
    fullName: "admin01",
  };

  const [fullName, setFullName] = useState(mockUser.fullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;

    console.log("UpdateUserDataForm", { fullName, avatar });
  }

  function handleCancel() {
    setFullName(mockUser.fullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email">
        <Input value={"email@test.com"} disabled />
      </FormRow>

      {/* This field is for customer only */}
      <FormRow label="Số dư tài khoản">
        <Input value={"7,000,000 vnđ"} disabled />
      </FormRow>

      <FormRow label="Tên tài khoản">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>

      <FormRow label="Ảnh đại diện">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>

      <FormRow hasButton>
        <Button type="reset" variation="secondary" onClick={handleCancel}>
          Hủy
        </Button>
        <Button>Lưu thay đổi</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;

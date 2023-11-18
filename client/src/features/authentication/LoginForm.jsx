import { useState } from "react";

import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!userName || !password) return;

    console.log("LoginForm", { userName, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Tên tài khoản:">
        <Input
          type="text"
          id="username"
          autoComplete="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={true}
        />
      </FormRowVertical>

      <FormRowVertical label="Mật khẩu:">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={true}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={true}>
          {!true ? "Đăng nhập" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;

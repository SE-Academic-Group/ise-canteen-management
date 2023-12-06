import FormData from "form-data";
import axiosClient from "../utils/axios";

export async function login({ email, password }) {
  const { data } = await axiosClient.post("auth/login", {
    email,
    password,
  });

  return data;
}

export async function logout() {
  await axiosClient.post("auth/logout");
}

export async function signup({ username, password, email, name }) {
  const { data } = await axiosClient.post("auth/signup", {
    username,
    password,
    email,
    name,
  });

  return data;
}

export async function getCurrentUser() {
  const { data } = await axiosClient.get("auth/me");

  return data.data;
}

export async function updateCurrentUser({ name, phone, image }) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  image && formData.append("image", image);

  const { data } = await axiosClient.patch("auth/me", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data.data;
}

import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
import FormData from "form-data";

const withCredentialsAxios = axios.create({
  withCredentials: true,
});

export async function login({ email, password }) {
  const { data } = await withCredentialsAxios.post(
    `${BACKEND_URL}/auth/login`,
    {
      email,
      password,
    }
  );

  return data;
}

export async function logout() {
  await withCredentialsAxios.post(`${BACKEND_URL}/auth/logout`);
}

export async function signup({ username, password, email, name }) {
  const { data } = await withCredentialsAxios({
    method: "POST",
    url: `${BACKEND_URL}/auth/signup`,
    data: {
      username,
      password,
      email,
      name,
    },
  });

  return data;
}

export async function getCurrentUser() {
  const { data } = await withCredentialsAxios.get(`${BACKEND_URL}/auth/me`);

  return data.data;
}

export async function updateCurrentUser({ name, phone, image }) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  image && formData.append("image", image);

  const { data } = await withCredentialsAxios.patch(
    `${BACKEND_URL}/auth/me`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data.data;
}

import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

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

  return data.data;
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

  return data.data;
}

export async function getCurrentUser() {
  const { data } = await withCredentialsAxios.get(`${BACKEND_URL}/auth/me`);

  return data.data;
}

export async function updateCurrentUser({ name, phone }) {
  const { data } = await withCredentialsAxios.patch(`${BACKEND_URL}/users/me`, {
    name,
    phone,
  });

  return data.data;
}

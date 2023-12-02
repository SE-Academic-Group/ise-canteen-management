import axios from "axios";

const BACKEND_URL = "http://localhost:6969/api/v1";

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

import axios from "axios";

import { PAGE_SIZE } from "../utils/constants";

export async function getUsers({ page = 1, filters }) {
  const url = new URL("http://localhost:3001/users");
  url.searchParams.append("_page", page);
  url.searchParams.append("_limit", PAGE_SIZE);

  filters?.forEach((filter) => {
    url.searchParams.append(filter.field, filter.value);
  });

  const res = await axios(url.toString());
  const count = res.headers["x-total-count"];

  return { data: res.data, count };
}

export async function deleteUser(id) {
  await axios.delete(`http://localhost:3001/users/${id}`);
}

export async function createEditUser(userData, id) {
  if (id) {
    await axios.put(`http://localhost:3001/users/${id}`, userData);
  } else {
    await axios.post("http://localhost:3001/users", userData);
  }
}

import axios from "axios";

import { PAGE_SIZE, BACKEND_URL } from "../utils/constants";

const RESOURCE_URL = BACKEND_URL + "/users";

export async function getUsers({ page = 1, filters }) {
  const url = new URL(RESOURCE_URL);
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
  await axios.delete(`${RESOURCE_URL}//${id}`);
}

export async function createEditUser(userData, id) {
  if (id) {
    await axios.patch(`${RESOURCE_URL}/${id}`, userData);
  } else {
    await axios.post(RESOURCE_URL, userData);
  }
}

import axiosClient from "../utils/axios";
import { PAGE_SIZE } from "../utils/constants";

export async function getUsers({ page = 1, filters }) {
  const searchParams = new URLSearchParams();

  searchParams.append("page", page);
  searchParams.append("limit", PAGE_SIZE);

  filters?.forEach((filter) => {
    searchParams.append(filter.field, filter.value);
  });

  const { data } = await axiosClient(`users?${searchParams.toString()}`);

  return { data: data.data, count: data.result };
}

export async function deleteUser(id) {
  await axiosClient.delete(`users/${id}`);
}

export async function createEditUser(userData, id) {
  if (id) {
    await axiosClient.patch(`users/${id}`, userData);
  } else {
    await axiosClient.post(`users`, userData);
  }
}

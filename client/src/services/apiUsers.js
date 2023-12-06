import axiosClient from "../utils/axios";
import { buildUrlParams } from "../utils/apiFeatures";
export async function getUsers({ page = 1, filters }) {
  const url = buildUrlParams("users", { page, filters });
  const res = await axiosClient(url);
  const count = Number(res.headers["x-total-count"]);

  return { data: res.data.data, count };
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

import axiosClient from "./axios";
import { buildUrlParams } from "./apiFeatures";

export function getItemsFactory(name) {
  return async function ({ page = 1, filters }) {
    const url = buildUrlParams(name, { page, filters });
    const res = await axiosClient(url);
    const count = Number(res.headers["x-total-count"]);

    return { data: res.data.data, count };
  };
}

export function deleteItemFactory(name) {
  return async function (id) {
    await axiosClient.delete(`${name}/${id}`);
  };
}

export function createEditItemFactory(name) {
  return async function (itemData, id) {
    if (id) {
      await axiosClient.patch(`${name}/${id}`, itemData);
    } else {
      await axiosClient.post(`${name}`, itemData);
    }
  };
}

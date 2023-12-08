import axiosClient from "./axios";
import FormData from "form-data";
import { buildUrlParams } from "./apiFeatures";

export function getItemsFactory(name) {
  return async function ({ page = 1, filters, sortBy }) {
    const url = buildUrlParams(name, { page, filters, sortBy });
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
  return async function (data, id) {
    const { image, ...fields } = data;
    let postData = fields;
    let config = {};

    if (image) {
      const formData = new FormData();

      formData.append("image", image);
      Object.keys(fields).forEach((key) => {
        formData.append(key, fields[key]);
      });

      postData = formData;
      config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
    }

    if (id) {
      await axiosClient.patch(`${name}/${id}`, postData, config);
    } else {
      await axiosClient.post(`${name}`, postData, config);
    }
  };
}

import axiosClient from "./axios";
import { buildUrlParams } from "./apiFeatures";
import { PAGE_SIZE } from "../constants/api";

/**
 * Returns a factory function that retrieves items based on the provided name.
 * @param {string} name - The name of the items to retrieve.
 * @returns {Function} - The factory function that retrieves items.
 */
export function getItemsFactory(name) {
  return async function (options = {}) {
    options.limit ??= PAGE_SIZE;

    const url = buildUrlParams(name, options);
    const res = await axiosClient(url);
    const count = Number(res.headers["x-total-count"]);

    return { data: res.data.data, count };
  };
}

/**
 * Returns a factory function that fetches an item by its ID from the API.
 * @param {string} name - The name of the item.
 * @returns {Function} - The factory function that fetches the item.
 */
export function getItemFactory(name) {
  return async function (id) {
    const res = await axiosClient(`${name}/${id}`);
    return res.data.data;
  };
}

/**
 * Factory function that creates a deleteItem function for a specific resource.
 * @param {string} name - The name of the resource.
 * @returns {Function} - The deleteItem function.
 */
export function deleteItemFactory(name) {
  return async function (id) {
    await axiosClient.delete(`${name}/${id}`);
  };
}

/**
 * Factory function that creates a function to create or edit an item in the API.
 * @param {string} name - The name of the item.
 * @returns {Function} - The create or edit item function.
 */
export function createEditItemFactory(name) {
  return async function (data = {}, id) {
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
      const res = await axiosClient.patch(`${name}/${id}`, postData, config);
      return res.data.data;
    }

    const res = await axiosClient.post(
      `${name}`,
      Array.isArray(data) ? data : postData,
      config
    );

    return res.data.data;
  };
}

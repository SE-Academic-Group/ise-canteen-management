import axios from "axios";

import { PAGE_SIZE, BACKEND_URL } from "../utils/constants";

const RESOURCE_URL = BACKEND_URL + "/products";

export async function getProducts({
  page = 1,
  filters = [],
  sortBy = null,
  q = null,
}) {
  sortBy = sortBy || { sort: "id", order: "asc" };

  const url = new URL(RESOURCE_URL);
  url.searchParams.append("_page", page);
  url.searchParams.append("_limit", PAGE_SIZE);

  if (sortBy) {
    url.searchParams.append("_sort", sortBy.sort);
    url.searchParams.append("_order", sortBy.order);
  }

  if (q) {
    url.searchParams.append("q", q);
  }

  filters?.forEach((filter) => {
    url.searchParams.append(filter.field, filter.value);
  });

  const res = await axios(url.toString());
  const count = res.headers["x-total-count"];

  return { data: res.data, count };
}

export async function createEditProduct(productData, id) {
  if (id) {
    await axios.patch(`${RESOURCE_URL}/${id}`, productData);
  } else {
    await axios.post(RESOURCE_URL, productData);
  }
}

export async function deleteProduct(id) {
  await axios.delete(`${RESOURCE_URL}/${id}`);
}

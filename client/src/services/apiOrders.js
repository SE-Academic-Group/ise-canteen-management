import axios from "axios";

import { PAGE_SIZE, BACKEND_URL } from "../utils/constants";

const RESOURCE_URL = BACKEND_URL + "/orders";

export async function getOrders({ page = 1, filters = [], sortBy }) {
  sortBy = sortBy || { sort: "orderDate", order: "desc" };

  const url = new URL(RESOURCE_URL);
  url.searchParams.append("_page", page);
  url.searchParams.append("_limit", PAGE_SIZE);
  url.searchParams.append("_sort", sortBy.sort);
  url.searchParams.append("_order", sortBy.order);

  filters?.forEach((filter) => {
    url.searchParams.append(filter.field, filter.value);
  });

  const res = await axios(url.toString());
  const count = res.headers["x-total-count"];

  return { data: res.data, count };
}

export async function getOrder(orderId) {
  const res = await axios(`${RESOURCE_URL}/${orderId}`);
  return res.data;
}

export async function updateOrder(orderId, order) {
  const res = await axios.patch(`${RESOURCE_URL}/${orderId}`, order);
  return res.data;
}

import {
  getItemFactory,
  getItemsFactory,
  createEditItemFactory,
} from "../utils/apiItemsFactory";

const RESOURCE_NAME = "orders";

export const getOrders = getItemsFactory(RESOURCE_NAME);
export const getOrder = getItemFactory(RESOURCE_NAME);
export const createOrder = createEditItemFactory(RESOURCE_NAME);
export const updateOrder = createEditItemFactory(RESOURCE_NAME);
export function getMyOrders(userId, queryOptions = {}) {
  return getItemsFactory(`users/${userId}/orders`)(queryOptions);
}

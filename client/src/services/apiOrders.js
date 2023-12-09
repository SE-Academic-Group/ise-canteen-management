import {
  getItemFactory,
  getItemsFactory,
  createEditItemFactory,
} from "../utils/apiItemsFactory";

export const getOrders = getItemsFactory("orders");
export const getOrder = getItemFactory("orders");
export const createOrder = createEditItemFactory("orders");
export const updateOrder = createEditItemFactory("orders");

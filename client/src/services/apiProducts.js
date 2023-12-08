import {
  createEditItemFactory,
  deleteItemFactory,
  getItemsFactory,
  getItemFactory,
} from "../utils/apiItemsFactory";

export const getProducts = getItemsFactory("products");
export const deleteProduct = deleteItemFactory("products");
export const createEditProduct = createEditItemFactory("products");
export const getProduct = getItemFactory("products");

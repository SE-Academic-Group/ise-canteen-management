import {
  createEditItemFactory,
  deleteItemFactory,
  getItemsFactory,
} from "../utils/apiItemsFactory";

export const getProducts = getItemsFactory("products");
export const deleteProduct = deleteItemFactory("products");
export const createEditProduct = createEditItemFactory("products");

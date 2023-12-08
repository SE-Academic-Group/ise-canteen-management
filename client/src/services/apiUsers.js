import {
  createEditItemFactory,
  deleteItemFactory,
  getItemsFactory,
} from "../utils/apiItemsFactory";

export const getUsers = getItemsFactory("users");
export const deleteUser = deleteItemFactory("users");
export const createEditUser = createEditItemFactory("users");

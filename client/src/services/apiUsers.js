import {
  createEditItemFactory,
  deleteItemFactory,
  getItemsFactory,
} from "../utils/apiItemsFactory";

const RESOURCE_NAME = "users";

export const getUsers = getItemsFactory(RESOURCE_NAME);
export const deleteUser = deleteItemFactory(RESOURCE_NAME);
export const createEditUser = createEditItemFactory(RESOURCE_NAME);

import {
  createEditItemFactory,
  deleteItemFactory,
  getItemsFactory,
  getItemFactory,
} from "../utils/apiItemsFactory";

export const getMenuHistories = getItemsFactory("menu-histories");
export const deleteMenuHistory = deleteItemFactory("menu-histories");
export const createEditMenuHistory = createEditItemFactory("menu-histories");
export const getMenuHistory = getItemFactory("menu-histories");

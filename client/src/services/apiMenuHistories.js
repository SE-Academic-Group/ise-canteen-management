import {
  createEditItemFactory,
  deleteItemFactory,
  getItemFactory,
  getItemsFactory,
} from "../utils/apiItemsFactory";

const RESOURCE_NAME = "menu-histories";

export const getMenuHistories = getItemsFactory(RESOURCE_NAME);
export const deleteMenuHistory = deleteItemFactory(RESOURCE_NAME);
export const createEditMenuHistory = createEditItemFactory(RESOURCE_NAME);
export const getMenuHistory = getItemFactory(RESOURCE_NAME);

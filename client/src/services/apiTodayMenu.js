import {
  createEditItemFactory,
  deleteItemFactory,
  getItemsFactory,
} from "../utils/apiItemsFactory";

const RESOURCE_NAME = "today-menu";

export const getTodayMenu = getItemsFactory(RESOURCE_NAME);
export const createTodayMenu = createEditItemFactory(
  RESOURCE_NAME + "/create-today-menu"
);
export const closeTodayMenu = createEditItemFactory(
  RESOURCE_NAME + "/close-today-menu"
);
export const addTodayMenuItem = createEditItemFactory(RESOURCE_NAME);
export const deleteTodayMenuItem = deleteItemFactory(RESOURCE_NAME);
export const updateTodayMenuItem = createEditItemFactory(RESOURCE_NAME);

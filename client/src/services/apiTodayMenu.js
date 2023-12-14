import {
  createEditItemFactory,
  deleteItemFactory,
  getItemsFactory,
} from "../utils/apiItemsFactory";

const RESOURCE_NAME = "today-menu";

// export const getTodayMenu = getItemsFactory(RESOURCE_NAME);
// export const createTodayMenu = createEditItemFactory(RESOURCE_NAME);
// export const editTodayMenu = createEditItemFactory(RESOURCE_NAME);
// export const closeTodayMenu = createEditItemFactory(RESOURCE_NAME);
export const addTodayMenuItem = createEditItemFactory(RESOURCE_NAME);
// export const deleteTodayMenuItem = deleteItemFactory(RESOURCE_NAME);
// export const createEditTodayMenuItem = createEditItemFactory(RESOURCE_NAME);

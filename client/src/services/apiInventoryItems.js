import {
  createEditItemFactory,
  deleteItemFactory,
  getItemsFactory,
} from "../utils/apiItemsFactory";

const RESOURCE_URL = "/inventory-items";

export const getInventoryItems = getItemsFactory(RESOURCE_URL);
export const deleteInventoryItem = deleteItemFactory(RESOURCE_URL);
export const createEditInventoryItem = createEditItemFactory(RESOURCE_URL);

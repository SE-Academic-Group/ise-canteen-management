import {
  createEditItemFactory,
  deleteItemFactory,
  getItemsFactory,
} from "../utils/apiItemsFactory";

const RESOURCE_NAME = "inventory-items";

export const getInventoryItems = getItemsFactory(RESOURCE_NAME);
export const deleteInventoryItem = deleteItemFactory(RESOURCE_NAME);
export const createEditInventoryItem = createEditItemFactory(RESOURCE_NAME);

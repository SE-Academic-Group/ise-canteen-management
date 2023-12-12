import {
  createEditItemFactory,
  deleteItemFactory,
  getItemsFactory,
  getItemFactory,
} from "../utils/apiItemsFactory";

const RESOURCE_NAME = "products";

export const getProducts = getItemsFactory(RESOURCE_NAME);
export const deleteProduct = deleteItemFactory(RESOURCE_NAME);
export const createEditProduct = createEditItemFactory(RESOURCE_NAME);
export const getProduct = getItemFactory(RESOURCE_NAME);

export function getProductReviews(productId, queryOptions = {}) {
  return getItemsFactory(`${RESOURCE_NAME}/${productId}/reviews`)(queryOptions);
}

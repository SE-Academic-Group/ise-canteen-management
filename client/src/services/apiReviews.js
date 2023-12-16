import { createEditItemFactory } from "../utils/apiItemsFactory";

const RESOURCE_NAME = "reviews";

export const createReview = createEditItemFactory(RESOURCE_NAME);

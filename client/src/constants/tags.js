import { buildTagOptions } from "../utils/helpers";
import { CATEGORY, CHARGE_STATUS, ORDER_STATUS, ROLE } from "./dictionary";

/**
 * @constant {Array} TAGS - The array of role tag options.
 * @see {@link buildTagOptions}
 * @property {string} value - The value of the tag.
 * @property {string} label - The label of the tag.
 * @property {string} type - The type (color) of the tag.
 */
export const ROLE_TAGS = buildTagOptions(ROLE);
export const CATEGORY_TAGS = buildTagOptions(CATEGORY);
export const ORDER_STATUS_TAGS = buildTagOptions(ORDER_STATUS);
export const CHARGE_STATUS_TAGS = buildTagOptions(CHARGE_STATUS);

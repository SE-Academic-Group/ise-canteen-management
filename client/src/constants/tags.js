import { buildTagOptions } from "../utils/helpers";
import { ROLE } from "./dictionary";

/**
 * @constant {Array} TAGS - The array of role tag options.
 * @see {@link buildTagOptions}
 * @property {string} value - The value of the tag.
 * @property {string} label - The label of the tag.
 * @property {string} type - The type (color) of the tag.
 */
export const ROLE_TAGS = buildTagOptions(ROLE);

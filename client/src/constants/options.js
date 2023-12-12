import { buildOptions } from "../utils/helpers";
import { CATEGORY, ROLE, UNIT } from "./dictionary";

/**
 * @constant {Array} _OPTIONS - The array of category options.
 * @see {@link buildOptions}
 * @property {string} value - The value of the option (en).
 * @property {string} label - The label of the option (vi).
 */

export const CATEGORY_OPTIONS = buildOptions(CATEGORY);
export const UNIT_OPTIONS = buildOptions(UNIT);
export const ROLE_OPTIONS = buildOptions(ROLE);

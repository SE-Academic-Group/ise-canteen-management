/**
 * Builds URL parameters based on the provided resource name and options.
 * @param {string} resourceName - The name of the resource.
 * @param {object} options - The options for building the URL parameters.
 * @param {number} options.page - The page number.
 * @param {number} options.limit - The limit of items per page.
 * @param {Array} options.filters - The array of filters.
 * @param {string} options.filters.field - The field to filter by.
 * @param {string} options.filters.value - The value to filter by.
 * @param {string} options.sortBy.sort - The field to sort by.
 * @param {string} options.sortBy.order - The sort order ("asc" or "desc").
 * @param {string} options.q - The search query.
 * @returns {string} The built URL with parameters.
 */
export function buildUrlParams(resourceName, options) {
  const { page, limit, filters = [], sortBy, q } = options;

  const searchParams = new URLSearchParams();
  const connector = resourceName.includes("?") ? "&" : "?";

  page && searchParams.append("page", page);
  limit && searchParams.append("limit", limit);
  q && searchParams.append("q", q);

  filters.forEach((filter) => {
    searchParams.append(filter.field, filter.value);
  });

  if (sortBy && sortBy.sort && sortBy.order) {
    const prefix = sortBy.order === "asc" ? "" : "-";
    searchParams.append("sort", `${prefix}${sortBy.sort}`);
  }

  const url = resourceName + connector + searchParams.toString();

  return url;
}

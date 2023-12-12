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

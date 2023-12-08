import { PAGE_SIZE } from "./constants";

export function buildUrlParams(resource, options) {
  const { page, limit = PAGE_SIZE, filters, sortBy } = options;

  const searchParams = new URLSearchParams();

  page && searchParams.append("page", page);
  limit && searchParams.append("limit", limit);
  filters &&
    filters.forEach((filter) => {
      searchParams.append(filter.field, filter.value);
    });

  if (sortBy && sortBy.sort && sortBy.order) {
    const prefix = sortBy.order === "asc" ? "" : "-";
    searchParams.append("sort", `${prefix}${sortBy.sort}`);
  }

  return resource + "?" + searchParams.toString();
}

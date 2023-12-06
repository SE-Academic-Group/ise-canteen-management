import { PAGE_SIZE } from "./constants";

export function buildUrlParams(resource, options) {
  const { page, limit = PAGE_SIZE, filters } = options;

  const searchParams = new URLSearchParams();

  page && searchParams.append("page", page);
  limit && searchParams.append("limit", limit);
  filters &&
    filters.forEach((filter) => {
      searchParams.append(filter.field, filter.value);
    });

  return resource + "?" + searchParams.toString();
}
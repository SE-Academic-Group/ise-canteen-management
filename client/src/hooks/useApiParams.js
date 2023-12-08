import { useSearchParams } from "react-router-dom";

export function useApiParams({ filterFields = [] }) {
  const [searchParams] = useSearchParams();

  // Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // Search
  const q = searchParams.get("q") ?? "";

  // Filters
  const filters = filterFields
    .map((field) => {
      const value = searchParams.get(field);
      return { field, value };
    })
    .filter((filter) => filter.value !== null && filter.value !== "all");

  // Sort
  const sortField = searchParams.get("sortBy");
  const sortInfo = sortField?.split("-");
  const sortBy = sortField
    ? { sort: sortInfo.at(0), order: sortInfo.at(1) }
    : [];

  return { page, q, filters, sortBy };
}

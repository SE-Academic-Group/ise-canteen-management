import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook for fetching data using React Query.
 *
 * @param {Object} options - The options for fetching data.
 * @param {Function} options.fn - The function to be used for fetching data.
 * @param {string} options.key - The key for the query.
 * @returns {Object} - The result of the query fetch.
 */
export function useQueryFetch({ fn, key, ...options }) {
  const {
    isLoading,
    data = {},
    error,
  } = useQuery({
    queryKey: key,
    queryFn: fn,
    retry: false,
    ...options,
  });

  return { isLoading, error, data };
}

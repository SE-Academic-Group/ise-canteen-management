import { useQueryClient } from "@tanstack/react-query";

/**
 * Custom hook to prefetch a query using React Query's useQueryClient.
 *
 * @param {Object} options - The options for prefetching the query.
 * @param {Function} options.fn - The query function to be executed.
 * @param {string} options.key - The key for the query.
 * @param {boolean} [options.when=true] - Determines whether to prefetch the query or not.
 */
export function useQueryPrefetch({ fn, key, when = true }) {
  const queryClient = useQueryClient();

  when &&
    queryClient.prefetchQuery({
      queryKey: key,
      queryFn: fn,
    });
}

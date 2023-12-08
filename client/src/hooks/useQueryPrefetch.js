import { useQueryClient } from "@tanstack/react-query";

export function useQueryPrefetch({ fn, key, when = true }) {
  const queryClient = useQueryClient();

  when &&
    queryClient.prefetchQuery({
      queryKey: key,
      queryFn: fn,
    });
}

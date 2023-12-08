import { useQuery } from "@tanstack/react-query";

export function useQueryFetch({ fn, key }) {
  const {
    isLoading,
    data = {},
    error,
  } = useQuery({
    queryKey: key,
    queryFn: fn,
  });

  return { isLoading, error, data };
}

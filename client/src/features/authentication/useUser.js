import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/apiAuth";
import { QUERY_KEYS } from "../../constants/keys";

export function useUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: QUERY_KEYS.USER,
    queryFn: getCurrentUser,
    onError: (err) => {
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
    retry: false,
  });

  return { isLoading, user, isAuthenticated: !error && !isLoading };
}

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const navigate = useNavigate();

  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    onError: (err) => {
      navigate("/login", { replace: true });
    },
    retry: false,
  });

  return { isLoading, user, isAuthenticated: !error && !isLoading };
}

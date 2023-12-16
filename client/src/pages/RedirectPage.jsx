import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";

function RedirectPage() {
  const navigate = useNavigate();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/dashboard");
      } else if (user.role === "customer") {
        navigate("/customer-order");
      }
    }
  }, [isLoading, user, navigate]);

  if (isLoading) return null;

  return null;
}

export default RedirectPage;

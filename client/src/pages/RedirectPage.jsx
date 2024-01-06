import { Navigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import FullPageSpinner from "../ui/FullPageSpinner";

function RedirectPage() {
  const { isLoading, user, isAuthenticated } = useUser();

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user.role === "customer") {
    return <Navigate to="/customer/order" />;
  }

  if (user.role === "staff") {
    return <Navigate to="/orders" />;
  }

  if (user.role === "cashier") {
    return <Navigate to="/stats" />;
  }

  return <Navigate to="/dashboard" />;
}

export default RedirectPage;

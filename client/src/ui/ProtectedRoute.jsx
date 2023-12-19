import { Navigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";

import FullPageSpinner from "./FullPageSpinner";
import CustomerLayout from "./CustomerLayout";
import AppLayout from "./AppLayout";

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading, user } = useUser();

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user.role === "customer") {
    return <CustomerLayout>{children}</CustomerLayout>;
  }

  return <AppLayout>{children}</AppLayout>;
}

export default ProtectedRoute;

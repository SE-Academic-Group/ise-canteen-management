import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-50);
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // useEffect(() => {
  //   // if (!isAuthenticated && !isLoading) navigate("/login");
  // }, [isAuthenticated, isLoading, navigate]);

  return children;

  // if (isLoading)
  //   return (
  //     <FullPage>
  //       <Spinner />
  //     </FullPage>
  //   );

  // if (isAuthenticated) return children;
}

export default ProtectedRoute;

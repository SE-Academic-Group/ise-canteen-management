import styled from "styled-components";
import { useNumberOfCustomers } from "./useNumberOfCustomers";
import { useProducts } from "../products/useProducts";
import { useOrders } from "../orders/useOrders";
import { useUsers } from "../users/useUsers";

import FullPageSpinner from "../../ui/FullPageSpinner";
import Stats from "./Stats";
import DashboardFilter from "./DashboardFilter";
import RevenueChart from "./RevenueChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isUserLoading, count: noUsers } = useUsers();
  const { isLoading: isProductLoading, count: noProducts } = useProducts();
  const { isLoading: isOrderLoading, count: noOrders } = useOrders();
  const { isLoading: isNoCustomersLoading, count: noCustomers } =
    useNumberOfCustomers();
  const isWorking =
    isUserLoading || isProductLoading || isOrderLoading || isNoCustomersLoading;

  if (isWorking) {
    return <FullPageSpinner />;
  }

  return (
    <StyledDashboardLayout>
      <Stats
        noUsers={noUsers}
        noProducts={noProducts}
        noOrders={noOrders}
        noCustomers={noCustomers}
      />
      <DashboardFilter />
      <RevenueChart />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

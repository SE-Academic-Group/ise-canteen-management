import styled from "styled-components";
import { useUsers } from "../users/useUsers";
import { useProducts } from "../products/useProducts";
import { useOrders } from "../orders/useOrders";
import Stats from "./Stats";
import FullPageSpinner from "../../ui/FullPageSpinner";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isUserLoading, count: noUsers } = useUsers();
  const { isLoading: isProductLoading, count: noProducts } = useProducts();
  const { isLoading: isOrderLoading, count: noOrders } = useOrders();
  const isWorking = isUserLoading || isProductLoading || isOrderLoading;

  if (isWorking) {
    return <FullPageSpinner />;
  }

  return (
    <StyledDashboardLayout>
      <Stats noUsers={noUsers} noProducts={noProducts} noOrders={noOrders} />
      {/* <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity /> */}
      {/* <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} /> */}
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

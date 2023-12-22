import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import BackgroundHeading from "../ui/BackgroundHeading";

function Dashboard() {
  return (
    <>
      <BackgroundHeading as="h1">Tổng quan</BackgroundHeading>
      {/* <DashboardFilter /> */}
      <DashboardLayout />
    </>
  );
}

export default Dashboard;

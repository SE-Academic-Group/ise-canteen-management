import ImportStats from "../features/stats/ImportStats";
import RevenueStats from "../features/stats/RevenueStats";
import BackgroundHeading from "../ui/BackgroundHeading";

function Stats() {
  return (
    <>
      <BackgroundHeading as="h1">Thống kê</BackgroundHeading>
      <RevenueStats />
      <ImportStats />
    </>
  );
}

export default Stats;

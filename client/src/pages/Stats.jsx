import ExportStats from "../features/stats/ExportStats";
import ImportStats from "../features/stats/ImportStats";
import RevenueStats from "../features/stats/RevenueStats";
import StatsOperations from "../features/stats/StatsOperations";
import BackgroundHeading from "../ui/BackgroundHeading";

function Stats() {
  return (
    <>
      <BackgroundHeading as="h1">Thống kê</BackgroundHeading>
      <StatsOperations />
      <RevenueStats />
      <ImportStats />
      <ExportStats />
    </>
  );
}

export default Stats;

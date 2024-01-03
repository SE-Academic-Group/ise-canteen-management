import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import RevenueDay from "./RevenueDay";
import RevenueMonth from "./RevenueMonth";
import { useRevenueStatMonth } from "./useRevenueStatMonth";

function RevenueStats() {
  const { isLoading, revenueStatMonth } = useRevenueStatMonth();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div>
        <Heading as="h2">Doanh thu trong ngày</Heading>
        <RevenueDay revenueStatDay={revenueStatMonth.at(-1)} />
      </div>
      <div>
        <Heading as="h2">Doanh thu trong tháng</Heading>
        <RevenueMonth revenueStatMonth={revenueStatMonth} />
      </div>
    </div>
  );
}

export default RevenueStats;

import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { useRevenueStat } from "./useRevenueStat";
import { fullDateToShortDate } from "../../utils/helpers";

const StyledRevenueChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function RevenueChart() {
  const { isDarkMode } = useDarkMode();
  const { isLoading, revenueStat } = useRevenueStat();

  if (isLoading) {
    return <Spinner />;
  }

  const simplifiedRevenueStat = revenueStat.map((stat) => ({
    date: fullDateToShortDate(stat.date),
    totalRevenue: stat.totalRevenue,
  }));

  const colors = isDarkMode
    ? {
        totalRevenue: { stroke: "#4f46e5", fill: "#4f46e5" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalRevenue: { stroke: "#4f46e5", fill: "#c7d2fe" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledRevenueChart>
      <Heading as="h2">Biểu đồ doanh thu</Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={simplifiedRevenueStat} margin={{ left: 50 }}>
          <Legend verticalAlign="top" height={36} />

          <XAxis
            dataKey="date"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tickFormatter={(tick) => tick.toLocaleString()}
            unit="₫"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />

          <CartesianGrid strokeDasharray="4" />

          <Tooltip contentStyle={{ backgroundColor: colors.background }} />

          <Area
            dataKey="totalRevenue"
            type="monotone"
            stroke={colors.totalRevenue.stroke}
            fill={colors.totalRevenue.fill}
            strokeWidth={2}
            name="Tổng doanh thu"
            unit="₫"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledRevenueChart>
  );
}

export default RevenueChart;

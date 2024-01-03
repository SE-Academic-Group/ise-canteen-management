import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
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
import { fullDateToShortDate } from "../../utils/helpers";

const StyledRevenueChart = styled(DashboardBox)`
  margin-block-start: 1.6rem;
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function RevenueMonth({ revenueStatMonth }) {
  const { isDarkMode } = useDarkMode();

  const colors = isDarkMode
    ? {
        totalProfit: { stroke: "#4f46e5", fill: "#4f46e5" },
        totalRevenue: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalProfit: { stroke: "#4f46e5", fill: "#c7d2fe" },
        totalRevenue: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  const simplifiedRevenueStat = revenueStatMonth.map((stat) => ({
    date: fullDateToShortDate(stat.date),
    totalRevenue: stat.totalRevenue,
    totalProfit: stat.totalProfit,
  }));

  return (
    <StyledRevenueChart>
      <Heading as="h2">Biểu đồ doanh thu</Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={simplifiedRevenueStat} margin={{ left: 60 }}>
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

      <Heading as="h2">Biểu đồ lợi nhuận</Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={simplifiedRevenueStat} margin={{ left: 60 }}>
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
            dataKey="totalProfit"
            type="monotone"
            stroke={colors.totalProfit.stroke}
            fill={colors.totalProfit.fill}
            strokeWidth={2}
            name="Tổng lợi nhuận"
            unit="₫"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledRevenueChart>
  );
}

export default RevenueMonth;

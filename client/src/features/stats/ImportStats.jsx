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
import styled from "styled-components";
import { useDarkMode } from "../../context/DarkModeContext";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import { fullDateToShortDate } from "../../utils/helpers";
import DashboardBox from "./DashboardBox";
import { useImportStat } from "./useImportStat";

const StyledImportChart = styled(DashboardBox)`
  margin-block-start: 1.6rem;
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function ImportStats() {
  const { isLoading, importStat } = useImportStat();
  const { isDarkMode } = useDarkMode();

  if (isLoading) {
    return <Spinner />;
  }

  const colors = isDarkMode
    ? {
        totalImport: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalImport: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  const simplifiedImportStat = importStat.map((stat) => ({
    date: fullDateToShortDate(stat.date),
    totalValue: stat.totalValue,
  }));

  return (
    <div>
      <Heading as="h2">Giá trị nhập kho</Heading>

      <StyledImportChart>
        <Heading as="h2">Biểu đồ giá trị nhập kho</Heading>

        <ResponsiveContainer height={300} width="100%">
          <AreaChart data={simplifiedImportStat} margin={{ left: 60 }}>
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
              dataKey="totalValue"
              type="monotone"
              stroke={colors.totalImport.stroke}
              fill={colors.totalImport.fill}
              strokeWidth={2}
              name="Tổng giá trị nhập kho"
              unit="₫"
            />
          </AreaChart>
        </ResponsiveContainer>
      </StyledImportChart>
    </div>
  );
}

export default ImportStats;

import styled from "styled-components";
import { formatVietnameseCurrency } from "../../utils/helpers";

const Layout = styled.div`
  display: flex;
  gap: 2.4rem;
  margin-block: 1.6rem;
`;

const Box = styled.div`
  display: flex;
  gap: 1.6rem;
  background-color: var(--color-grey-0);
  padding: 1.6rem;
  border-radius: 8px;
  font-size: 1.8rem;
  border: 1px solid var(--color-grey-200);

  & > span:first-child {
    color: var(--color-grey-400);
    font-weight: 500;
  }

  & > span:last-child {
    font-weight: 600;
  }
`;

function RevenueDay({ revenueStatDay }) {
  const { totalRevenue, totalProfit, totalImportValue, date } = revenueStatDay;

  return (
    <Layout>
      <Box>
        <span>Ngày</span>
        <span>{date.toString().replace(/-/g, " / ")}</span>
      </Box>
      <Box>
        <span>Doanh thu</span>
        <span>{formatVietnameseCurrency(totalRevenue)}</span>
      </Box>
      <Box>
        <span>Lợi nhuận</span>
        <span>{formatVietnameseCurrency(totalProfit)}</span>
      </Box>
      <Box>
        <span>Giá nhập hàng</span>
        <span>{formatVietnameseCurrency(totalImportValue)}</span>
      </Box>
    </Layout>
  );
}

export default RevenueDay;

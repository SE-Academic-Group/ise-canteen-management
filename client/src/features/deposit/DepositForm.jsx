import styled from "styled-components";
import Heading from "../../ui/Heading";
import { formatVietnameseCurrency } from "../../utils/helpers";

const Card = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 1rem;
  margin-block: auto;
  padding: 4rem;
  background-color: var(--color-grey-50);
  border: 1px solid var(--color-grey-300);
  border-radius: 8px;

  & span:first-child {
    display: inline-block;
    min-inline-size: 16ch;
    font-weight: 500;
  }
`;

const Layout = styled.div`
  display: flex;
  justify-content: center;
`;

const StepHeading = styled(Heading)`
  margin-bottom: 2rem;
  text-align: center;
`;

const SuccessText = styled.span`
  color: var(--color-green-700);
  font-weight: 500;
`;

function DepositForm({ customer, amount }) {
  if (!customer || !amount) return null;

  return (
    <>
      <StepHeading as="h2">Kết quả nạp tiền</StepHeading>
      <Layout>
        <Card>
          <p>
            <span>Họ và tên: </span>
            <span>{customer?.name}</span>
          </p>
          <p>
            <span>Email: </span>
            <span>{customer?.email}</span>
          </p>
          <p>
            <span>Số dư cũ: </span>
            <span>{formatVietnameseCurrency(customer.balance)}</span>
          </p>
          <p>
            <span>Số tiền nạp: </span>
            <SuccessText>{formatVietnameseCurrency(amount)}</SuccessText>
          </p>
          <hr />
          <p>
            <span>Số dư mới: </span>
            <span>{formatVietnameseCurrency(amount + customer?.balance)}</span>
          </p>
        </Card>
      </Layout>
    </>
  );
}

export default DepositForm;

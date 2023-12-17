import styled from "styled-components";
import { useUser } from "../authentication/useUser";
import SpinnerMini from "../../ui/SpinnerMini";
import DataItem from "../../ui/DataItem";
import { formatVietnameseCurrency } from "../../utils/helpers";

const Card = styled.div`
  padding: 1.2rem;
  border-radius: 8px;
  background-color: var(--color-grey-0);
  border: 2px dashed var(--color-grey-300);
`;

function CustomerBalanceState() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <Card>
        <SpinnerMini />
      </Card>
    );
  }

  return (
    <Card>
      <DataItem label="Họ tên">
        <h3>{user.name}</h3>
      </DataItem>
      <DataItem label="Email">
        <span>{user.email}</span>
      </DataItem>
      <DataItem label="Số dư">
        <span>{formatVietnameseCurrency(user.balance)}</span>
      </DataItem>
    </Card>
  );
}

export default CustomerBalanceState;

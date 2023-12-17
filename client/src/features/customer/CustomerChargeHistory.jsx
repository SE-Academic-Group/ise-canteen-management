import styled from "styled-components";

import Empty from "../../ui/Empty";
import ErrorLoading from "../../ui/ErrorLoading";
import Spinner from "../../ui/Spinner";
import { formatDateTime, formatVietnameseCurrency } from "../../utils/helpers";
import { useUser } from "../authentication/useUser";
import { useMyChargeHistory } from "./useMyChargeHistory";
import { CHARGE_STATUS_TAGS } from "../../constants/tags";
import Tag from "../../ui/Tag";

const Container = styled.div`
  padding: 1.2rem;
  border: 2px dashed var(--color-grey-300);
  border-radius: 8px;
`;

const ItemContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;
  background-color: var(--color-grey-0);
  padding: 1.2rem;
  border-radius: 8px;

  &:not(:last-child) {
    margin-block-end: 0.8rem;
  }
`;

function CustomerChargeHistory() {
  const { user } = useUser();
  const { history, isLoading, count, error } = useMyChargeHistory(user._id);

  if (error) return <ErrorLoading error={error} />;

  if (isLoading) return <Spinner />;

  if (!count) return <Empty resourceName="lịch sử nạp tiền" />;

  return (
    <Container>
      {history.map((item) => {
        const tag = CHARGE_STATUS_TAGS[item.chargeStatus];

        return (
          <ItemContainer key={item._id}>
            <time>{formatDateTime(item.chargeDate)}</time>
            <span>{formatVietnameseCurrency(item.chargeAmount)}</span>
            <Tag type={tag.type}>{tag.label}</Tag>
          </ItemContainer>
        );
      })}
    </Container>
  );
}

export default CustomerChargeHistory;

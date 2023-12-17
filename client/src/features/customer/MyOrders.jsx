import styled from "styled-components";

import { useUser } from "../authentication/useUser";
import { useMyOrders } from "./useMyOrders";

import ErrorLoading from "../../ui/ErrorLoading";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import MyOrder from "./MyOrder";

const Container = styled.div`
  padding: 1.2rem;
  border-radius: 0.8rem;
`;

function MyOrders() {
  const { user } = useUser();
  const { isLoading, orders, error, count } = useMyOrders(user._id);

  if (error) return <ErrorLoading error={error} />;

  if (isLoading) return <Spinner />;

  if (!count) return <Empty resourceName="đơn hàng" />;

  return (
    <Container>
      {orders.map((order) => (
        <MyOrder key={order._id} order={order} />
      ))}
      <Pagination count={count} hasBox compact />
    </Container>
  );
}

export default MyOrders;

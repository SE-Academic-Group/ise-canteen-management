import Heading from "../ui/Heading";
import OrderTable from "../features/orders/OrderTable";
import OrderTableOperations from "../features/orders/OrderTableOperations";

import Row from "../ui/Row";

function Orders() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Quản lý đơn hàng</Heading>
        <OrderTableOperations />
      </Row>

      <OrderTable />
    </>
  );
}

export default Orders;

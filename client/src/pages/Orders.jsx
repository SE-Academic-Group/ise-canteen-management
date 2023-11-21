import Heading from "../ui/Heading";
import OrderTable from "../features/orders/OrderTable";

import Row from "../ui/Row";

function Orders() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Quản lý đơn hàng</Heading>
        <div>operations</div>
      </Row>

      <OrderTable />
    </>
  );
}

export default Orders;

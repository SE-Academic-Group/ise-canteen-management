import OrderTable from "../features/orders/OrderTable";
import OrderTableOperations from "../features/orders/OrderTableOperations";

import BackgroundHeading from "../ui/BackgroundHeading";

function Orders() {
  return (
    <>
      <BackgroundHeading as="h1">Quản lý đơn hàng</BackgroundHeading>
      <OrderTableOperations />
      <OrderTable />
    </>
  );
}

export default Orders;

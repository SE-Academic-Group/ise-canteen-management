import OrderTable from "../features/orders/OrderTable";
import OrderTableOperations from "../features/orders/OrderTableOperations";
import PageHeading from "../ui/PageHeading";

function Orders() {
  return (
    <>
      <PageHeading>Quản lý đơn hàng</PageHeading>
      <OrderTableOperations />
      {/* <OrderTable /> */}
    </>
  );
}

export default Orders;

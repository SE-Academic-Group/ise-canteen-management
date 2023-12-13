import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import OrderRow from "./OrderRow";

import { useOrders } from "./useOrders";
import ErrorLoading from "../../ui/ErrorLoading";

export default function OrderTable() {
  const { isLoading, count, orders, error } = useOrders();

  if (error) return <ErrorLoading error={error} />;

  if (isLoading) return <Spinner />;

  if (!count) return <Empty resourceName="đơn hàng" />;

  return (
    <Menus>
      <Table columns="8ch 1.5fr 20ch 16ch 3fr 1.2fr 3.2rem">
        <Table.Header>
          <div>STT</div>
          <div>Người đặt</div>
          <div>Ngày đặt</div>
          <div>Trạng thái</div>
          <div>Tóm tắt</div>
          <div>Thành tiền</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={orders}
          render={(order, i) => (
            <OrderRow key={order.id} order={order} serial={i + 1} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

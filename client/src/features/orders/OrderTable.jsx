import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import OrderRow from "./OrderRow";
import orders from "./mockOrders";

export default function OrderTable() {
  const isLoading = false;
  const length = 2;

  if (isLoading) return <Spinner />;

  if (!length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="1fr 1.5fr 12ch 1.5fr 2.5fr 1.5fr 3.2rem">
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
          render={(order) => <OrderRow key={order.id} order={order} />}
        />

        <Table.Footer>
          <Pagination count={55} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

import Progressing from "../../ui/Progressing";
import Pagination from "../../ui/Pagination";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import OrderRow from "./OrderRow";

import { useOrders } from "./useOrders";

export default function OrderTable() {
  const state = useOrders();
  const { count, orders } = state;

  return (
    <Progressing {...state} resourceName="Đơn hàng">
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
              <OrderRow key={order._id} order={order} serial={i + 1} />
            )}
          />

          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        </Table>
      </Menus>
    </Progressing>
  );
}

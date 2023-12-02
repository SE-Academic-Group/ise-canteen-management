import { HiCheckBadge, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

import {
  formatDateTime,
  formatVietnameseCurrency,
  padString,
} from "../../utils/helpers";
import { orderStatusToVietnamese } from "../../utils/translator";
import { useCancelOrder } from "./useCancelOrder";
import { useCompleteOrder } from "./useCompleteOrder";

function transformOrder(order) {
  const transformed = {
    ...order,
    number: padString(order.serial, 3),
    orderStatus: {
      tag: statusToTagName[order.orderStatus],
      name: orderStatusToVietnamese(order.orderStatus),
      value: order.orderStatus,
    },
    orderDate: formatDateTime(order.orderDate),
    totalPrice: formatVietnameseCurrency(order.totalPrice),
    orderItems: order.orderItems
      .map((item) => item.quantity + " " + item.name)
      .join(", "),
  };

  return transformed;
}

const statusToTagName = {
  completed: "green",
  cancelled: "red",
  pending: "silver",
};

function OrderRow({ order, serial }) {
  const navigate = useNavigate();
  const { isCompleting, completeOrder } = useCompleteOrder();
  const { isCancelling, cancelOrder } = useCancelOrder();
  const isWorking = isCompleting || isCancelling;

  const { id, user, totalPrice, orderStatus, orderDate, orderItems, number } =
    transformOrder({
      ...order,
      serial,
    });

  return (
    <Table.Row>
      <Table.Column.Number>{number}</Table.Column.Number>
      <span>{user.name}</span>
      <span>{orderDate}</span>
      <Tag type={orderStatus.tag}>{orderStatus.name}</Tag>
      <Table.Column.Description>{orderItems}</Table.Column.Description>
      <Table.Column.Amount>{totalPrice}</Table.Column.Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate("/orders/" + id)}
            >
              Xem chi tiết
            </Menus.Button>

            {orderStatus.value === "pending" && (
              <>
                <Menus.Button
                  icon={<HiCheckBadge />}
                  disabled={isWorking}
                  onClick={() => completeOrder(id)}
                >
                  Sẵn sàng
                </Menus.Button>

                <Modal.Open opens="cancel">
                  <Menus.Button icon={<HiTrash />}>Hủy đơn hàng</Menus.Button>
                </Modal.Open>
              </>
            )}
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="cancel">
          <ConfirmDelete
            title="Hủy đơn hàng"
            description="Bạn có chắc chắn muốn hủy đơn hàng này?"
            disabled={isWorking}
            onConfirm={() => cancelOrder(id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default OrderRow;

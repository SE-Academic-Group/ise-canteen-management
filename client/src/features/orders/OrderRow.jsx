import { HiCheckBadge, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

import { formatDateTime, formatVietnameseCurrency } from "../../utils/helpers";
import { translator } from "../../utils/translator";
import { useCancelOrder } from "./useCancelOrder";
import { useCompleteOrder } from "./useCompleteOrder";

function transformOrder(order) {
  const transformed = {
    ...order,
    orderStatus: {
      tag: statusToTagName[order.orderStatus],
      name: translator("order_status", order.orderStatus),
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

  const { _id, user, totalPrice, orderStatus, orderDate, orderItems } =
    transformOrder({
      ...order,
      serial,
    });

  return (
    <Table.Row>
      <Table.Column.Number>{serial}</Table.Column.Number>
      <span>{user.name}</span>
      <span>{orderDate}</span>
      <Tag type={orderStatus.tag}>{orderStatus.name}</Tag>
      <Table.Column.Description>{orderItems}</Table.Column.Description>
      <Table.Column.Amount>{totalPrice}</Table.Column.Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={_id} />
          <Menus.List id={_id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate("/orders/" + _id)}
            >
              Xem chi tiết
            </Menus.Button>

            {orderStatus.value === "pending" && (
              <>
                <Menus.Button
                  icon={<HiCheckBadge />}
                  disabled={isWorking}
                  onClick={() => completeOrder(_id)}
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
            onConfirm={() => cancelOrder(_id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default OrderRow;

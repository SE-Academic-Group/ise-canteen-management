import { HiCheckBadge, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCancelOrder } from "./useCancelOrder";
import { useCompleteOrder } from "./useCompleteOrder";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

import { ORDER_STATUS_TAGS } from "../../constants/tags";

function OrderRow({ order, serial }) {
  const navigate = useNavigate();
  const { isCompleting, completeOrder } = useCompleteOrder();
  const { isCancelling, cancelOrder } = useCancelOrder();
  const isWorking = isCompleting || isCancelling;

  const { _id, user, totalPrice, orderStatus, orderDate, orderItems } = order;
  const tag = ORDER_STATUS_TAGS[orderStatus];
  const shortDesc = orderItems
    .map((item) => item.quantity + " " + item.name)
    .join(", ");

  return (
    <Table.Row>
      <Table.Column.Number>{serial}</Table.Column.Number>
      <Table.Column.Text>{user.name}</Table.Column.Text>
      <Table.Column.DateTime>{orderDate}</Table.Column.DateTime>
      <Tag type={tag.type}>{tag.label}</Tag>
      <Table.Column.Description>{shortDesc}</Table.Column.Description>
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

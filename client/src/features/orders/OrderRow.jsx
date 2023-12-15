import { PiCookingPotDuotone } from "react-icons/pi";
import { HiCheckBadge, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useUpdateOrderStatus } from "./useUpdateOrderStatus";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

import { ORDER_STATUS_TAGS } from "../../constants/tags";

function OrderRow({ order, serial }) {
  const navigate = useNavigate();
  const { isUpdating: isCompleting, updateOrderStatus: completeOrder } =
    useUpdateOrderStatus("completed", "hoàn thành");
  const { isUpdating: isCancelling, updateOrderStatus: cancelOrder } =
    useUpdateOrderStatus("cancelled", "bị hủy");
  const { isUpdating: isPreparing, updateOrderStatus: prepareOrder } =
    useUpdateOrderStatus("preparing", "đang chuẩn bị");
  const isWorking = isCancelling || isCompleting || isPreparing;

  const { _id, totalPrice, orderStatus, orderDate, orderItems, userId } = order;
  const user = userId ?? { name: "Khách", email: "N/A" };
  const tag = ORDER_STATUS_TAGS[orderStatus];
  const shortDesc = orderItems
    .map((item) => item.quantity + " " + item.productId.name)
    .join(", ");

  return (
    <Table.Row>
      <Table.Column.Serial>{serial}</Table.Column.Serial>
      <Table.Column.Stacked>
        <span>{user.name}</span>
        <span title={user.email}>{user.email}</span>
      </Table.Column.Stacked>
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

            {orderStatus === "preparing" && (
              <Menus.Button
                icon={<HiCheckBadge />}
                disabled={isWorking}
                onClick={() => completeOrder(_id)}
              >
                Sẵn sàng
              </Menus.Button>
            )}

            {orderStatus === "success" && (
              <>
                <Menus.Button
                  icon={<PiCookingPotDuotone />}
                  disabled={isWorking}
                  onClick={() => prepareOrder(_id)}
                >
                  Chuẩn bị
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

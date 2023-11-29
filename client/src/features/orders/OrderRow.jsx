import { HiEye, HiCheckBadge, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
import { useCompleteOrder } from "./useCompleteOrder";
import { useCancelOrder } from "./useCancelOrder";

const Serial = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Amount = styled.div`
  font-weight: 500;
`;

const statusToTagName = {
  completed: "green",
  cancelled: "red",
  pending: "silver",
};

function OrderRow({
  order: { id, user, totalPrice, orderStatus, orderDate, orderItems },
  serial,
}) {
  const navigate = useNavigate();
  const { isCompleting, completeOrder } = useCompleteOrder();
  const { isCancelling, cancelOrder } = useCancelOrder();
  const isWorking = isCompleting || isCancelling;

  return (
    <Table.Row>
      <Serial>{padString(serial, 3)}</Serial>

      <span>{user.name}</span>

      <span>{formatDateTime(orderDate)}</span>

      <Tag type={statusToTagName[orderStatus]}>
        {orderStatusToVietnamese(orderStatus)}
      </Tag>

      <span>{orderItems.map((i) => i.quantity + " " + i.name).join(", ")}</span>

      <Amount>{formatVietnameseCurrency(totalPrice)}</Amount>

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

            {orderStatus === "pending" && (
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

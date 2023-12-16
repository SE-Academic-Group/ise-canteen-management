import styled from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useUpdateOrderStatus } from "./useUpdateOrderStatus";
import { useOrder } from "./useOrder";

import ConfirmDelete from "../../ui/ConfirmDelete";
import ErrorLoading from "../../ui/ErrorLoading";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Empty from "../../ui/Empty";
import Modal from "../../ui/Modal";
import Tag from "../../ui/Tag";
import Row from "../../ui/Row";
import OrderDataBox from "./OrderDataBox";

import { ORDER_STATUS_TAGS } from "../../constants/tags";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function OrderDetail() {
  const moveBack = useMoveBack();
  const { order, isLoading, error } = useOrder();
  const { isUpdating: isCompleting, updateOrderStatus: completeOrder } =
    useUpdateOrderStatus("completed", "hoàn thành");
  const { isUpdating: isCancelling, updateOrderStatus: cancelOrder } =
    useUpdateOrderStatus("cancelled", "bị hủy");
  const { isUpdating: isPreparing, updateOrderStatus: prepareOrder } =
    useUpdateOrderStatus("preparing", "đang chuẩn bị");
  const isWorking = isCancelling || isCompleting || isPreparing;

  if (error) return <ErrorLoading error={error} />;

  if (isLoading) return <Spinner />;

  if (!order) return <Empty resourceName="đơn hàng" />;

  const { orderStatus, _id: orderId } = order;
  const tag = ORDER_STATUS_TAGS[orderStatus];

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Đơn hàng #{orderId}</Heading>
          <Tag type={tag.type}>{tag.label}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>
          <span role="presentation">&larr;</span>
          <span>Quay lại</span>
        </ButtonText>
      </Row>

      <OrderDataBox order={order} />

      <ButtonGroup>
        {orderStatus === "success" && (
          <Modal>
            <Button onClick={() => prepareOrder(orderId)}>Chuẩn bị</Button>

            <Modal.Open opens="delete">
              <Button variation="danger" disabled={isWorking}>
                Hủy đơn hàng
              </Button>
            </Modal.Open>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="đơn hàng"
                disabled={isWorking}
                onConfirm={() => cancelOrder(orderId)}
              />
            </Modal.Window>
          </Modal>
        )}

        {orderStatus === "preparing" && (
          <Button onClick={() => completeOrder(orderId)}>Hoàn tất</Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Quay lại
        </Button>
      </ButtonGroup>
    </>
  );
}

export default OrderDetail;

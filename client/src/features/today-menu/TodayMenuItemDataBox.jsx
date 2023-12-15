import { HiEye, HiPencil, HiTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRemoveTodayMenuItem } from "./useRemoveTodayMenuItem";

import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { getImageUrl } from "../../utils/helpers";
import UpdateMenuItemQuantityForm from "./UpdateMenuItemQuantityForm";

const Container = styled.article`
  max-inline-size: var(--_grid-item-width);
  border: 2px dashed var(--color-brand-200);
  padding: 1.6rem;
  border-radius: 8px;
  background-color: var(--color-grey-0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  position: relative;
  font-size: 1.4rem;
`;

const Image = styled.img`
  height: 160px;
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  background-color: var(--color-grey-0);
  margin-block-end: 1.6rem;
`;

const Name = styled.h4`
  font-size: 1.6rem;
  font-weight: 500;
  text-wrap: balance;
  padding-inline: 0.4rem;
`;

const Actions = styled.div`
  position: absolute;
  inset: 0;
`;

function TodayMenuItemDataBox({ item }) {
  const navigate = useNavigate();
  const { isRemoving, removeTodayMenuItem } = useRemoveTodayMenuItem();
  const {
    productId,
    totalQuantity,
    quantity: remainQuantity,
    name,
    image,
    _id: itemId,
  } = item;
  const soldQuantity = totalQuantity - remainQuantity;
  const isWorking = isRemoving;

  return (
    <Container>
      <Image src={getImageUrl(image)} alt={name} />
      <Name>{name}</Name>
      <p>
        Đã bán: {soldQuantity} / {totalQuantity}
      </p>
      <p>Số lượng còn lại: {remainQuantity}</p>

      <Actions>
        <Modal>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={productId} />
              <Menus.List id={productId}>
                <Menus.Button
                  disabled={isWorking}
                  icon={<HiEye />}
                  onClick={() => navigate(`/products/${productId}`)}
                >
                  Xem chi tiết
                </Menus.Button>

                <Modal.Open opens="update-quantity">
                  <Menus.Button disabled={isWorking} icon={<HiPencil />}>
                    Cập nhật số lượng
                  </Menus.Button>
                </Modal.Open>

                <Modal.Open opens="remove-item">
                  <Menus.Button disabled={isWorking} icon={<HiTrash />}>
                    Xóa khỏi thực đơn
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
          </Menus>

          <Modal.Window name="remove-item">
            <ConfirmDelete
              title="Xóa sản phẩm ra khỏi thực đơn"
              description="Bạn có chắc chắn muốn xóa sản phẩm này ra khỏi thực đơn hôm nay?"
              disabled={isWorking}
              onConfirm={() => removeTodayMenuItem(itemId)}
            />
          </Modal.Window>

          <Modal.Window name="update-quantity">
            <UpdateMenuItemQuantityForm productToUpdate={item} />
          </Modal.Window>
        </Modal>
      </Actions>
    </Container>
  );
}

export default TodayMenuItemDataBox;

import styled from "styled-components";
import { getImageUrl } from "../../utils/helpers";

import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { HiPencil, HiTrash, HiEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

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
`;

const Image = styled.img`
  height: 160px;
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  background-color: var(--color-grey-0);
  margin-block-end: 1.6rem;
`;

const Name = styled.h4`
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
  const {
    productId,
    totalQuantity,
    quantity: remainQuantity,
    name,
    image,
  } = item;
  const soldQuantity = totalQuantity - remainQuantity;

  return (
    <Container>
      <Image src={getImageUrl(image)} alt={name} />
      <Name>{name}</Name>
      <p>
        Đã bán: {soldQuantity} / {totalQuantity}
      </p>

      <Actions>
        <Modal>
          <Menus>
            <Menus.Menu>
              <Menus.Toggle id={productId} />
              <Menus.List id={productId}>
                <Menus.Button
                  icon={<HiEye />}
                  onClick={() => navigate(`/products/${productId}`)}
                >
                  Xem chi tiết
                </Menus.Button>
                <Menus.Button icon={<HiPencil />}>
                  Cập nhật số lượng
                </Menus.Button>
                <Menus.Button icon={<HiTrash />}>
                  Xóa khỏi thực đơn
                </Menus.Button>
              </Menus.List>
            </Menus.Menu>
          </Menus>
        </Modal>
      </Actions>
    </Container>
  );
}

export default TodayMenuItemDataBox;

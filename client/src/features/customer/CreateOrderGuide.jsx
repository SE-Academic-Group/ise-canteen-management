import styled from "styled-components";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  font-size: 1.4rem;
  padding: 0.8rem;
`;

const Guide = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  svg {
    font-size: 2rem;
    color: var(--color-yellow-700);
  }
`;

function CreateOrderGuide() {
  return (
    <Container>
      <Guide>
        <MdOutlineTipsAndUpdates />
        <span>Bấm vào ảnh của sản phẩm để thêm vào danh sách đặt hàng</span>
      </Guide>
      <Guide>
        <MdOutlineTipsAndUpdates />
        <span>
          Bấm vào ảnh của sản phẩm đã thêm để bỏ khỏi danh sách đặt hàng
        </span>
      </Guide>
    </Container>
  );
}

export default CreateOrderGuide;

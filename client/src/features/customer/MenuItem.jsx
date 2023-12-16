import styled from "styled-components";

import Tag from "../../ui/Tag";
import { formatVietnameseCurrency, getImageUrl } from "../../utils/helpers";

const Container = styled.article`
  font-size: 1.2rem;
  text-align: center;
  border: 1px dashed var(--color-grey-400);
  border-radius: 8px;
  padding-block: 0.8rem;
  padding-inline: 0.24rem;
  display: flex;
  flex-direction: column;
  gap: 0.24rem;
  justify-content: space-between;
  align-items: center;

  &.active {
    border-color: var(--color-brand-600);
    border-width: 2px;
    font-weight: 500;
    color: var(--color-brand-600);
  }
`;

const Image = styled.img`
  height: 80px;
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  background-color: var(--color-grey-0);
  margin-block-end: 1.6rem;
`;

const Name = styled.p`
  font-weight: 500;
`;

function MenuItem({
  item,
  handleAddItem,
  handleRemoveItem,
  handleUpdateQuantity,
  active,
}) {
  const { name, image, price, quantity } = item;

  function handleClickItem() {
    if (active) {
      handleRemoveItem(item);
    } else {
      handleAddItem(item);
    }
  }

  return (
    <Container className={active ? "active" : ""} onClick={handleClickItem}>
      <Image src={getImageUrl(image)} alt={item.name} />
      <Name>{name}</Name>
      {quantity > 0 ? <p>Còn {quantity}</p> : <Tag type="red">Hết hàng</Tag>}
      <p>{formatVietnameseCurrency(price)}</p>
    </Container>
  );
}

export default MenuItem;

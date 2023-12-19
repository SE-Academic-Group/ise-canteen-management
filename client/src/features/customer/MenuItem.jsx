import styled from "styled-components";

import Tag from "../../ui/Tag";
import { formatVietnameseCurrency, getImageUrl } from "../../utils/helpers";
import { NavLink } from "react-router-dom";

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
  cursor: pointer;
`;

const Name = styled.p`
  font-weight: 500;
`;

const DetailLink = styled(NavLink)`
  color: var(--color-brand-600);
  font-weight: 500;
  font-size: 1.2rem;
  text-decoration: underline;
`;

function MenuItem({
  item,
  handleAddItem,
  handleRemoveItem,
  handleUpdateQuantity,
  active,
}) {
  const { name, image, price, quantity, productId } = item;

  function handleClickItem() {
    if (quantity <= 0) return;

    if (active) {
      handleRemoveItem(item);
    } else {
      handleAddItem(item);
    }
  }

  return (
    <Container className={active ? "active" : ""}>
      <Image
        src={getImageUrl(image)}
        alt={item.name}
        onClick={handleClickItem}
      />
      <Name>{name}</Name>
      {quantity > 0 ? <p>Còn {quantity}</p> : <Tag type="red">Hết hàng</Tag>}
      <p>{formatVietnameseCurrency(price)}</p>
      <DetailLink to={`/customer/products/${productId}`}>Chi tiết</DetailLink>
    </Container>
  );
}

export default MenuItem;

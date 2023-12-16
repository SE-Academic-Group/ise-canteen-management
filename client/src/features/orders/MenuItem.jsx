import styled from "styled-components";
import { formatVietnameseCurrency, getImageUrl } from "../../utils/helpers";
import { CiSquarePlus, CiTrash } from "react-icons/ci";
import ButtonIcon from "../../ui/ButtonIcon";
import Tag from "../../ui/Tag";

const Container = styled.article`
  text-align: center;
  border: 1px dashed var(--color-grey-400);
  border-radius: 8px;
  padding: 0.8rem 0.4rem;
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
  height: 120px;
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

  function handleSelectItem() {
    if (!active) {
      handleAddItem(item);
    } else {
      handleUpdateQuantity(item._id, null, true);
    }
  }

  function handleDeleteItem() {
    if (active) {
      handleRemoveItem(item);
    }
  }

  return (
    <Container className={active ? "active" : ""}>
      <Image src={getImageUrl(image)} alt={item.name} />
      <div>
        <Name>{name}</Name>
        {quantity > 0 ? <p>Còn {quantity}</p> : <Tag type="red">Hết hàng</Tag>}
        <p>{formatVietnameseCurrency(price)}</p>
      </div>
      <div>
        <ButtonIcon
          onClick={handleSelectItem}
          disabled={active || quantity <= 0}
        >
          <CiSquarePlus />
        </ButtonIcon>
        <ButtonIcon onClick={handleDeleteItem} disabled={!active}>
          <CiTrash />
        </ButtonIcon>
      </div>
    </Container>
  );
}

export default MenuItem;

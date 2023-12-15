import styled from "styled-components";
import { HiTrash } from "react-icons/hi";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";

import { formatVietnameseCurrency } from "../../utils/helpers";
import ButtonIcon from "../../ui/ButtonIcon";

const Amount = styled.span`
  font-weight: 500;
`;

const Name = styled.span`
  font-weight: 500;
`;

const Container = styled.article`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background-color: var(--color-grey-0);
  border: 1px dashed var(--color-grey-200);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;

  & > :last-child {
    margin-left: auto;
  }

  &:not(:last-child) {
    margin-bottom: 0.8rem;
  }
`;

function MenuItemSummary({ item, handleRemoveItem, handleUpdateQuantity }) {
  const { price, quantity, name, availableQuantity, id } = item;
  const trimmedName = name.length > 20 ? name.slice(0, 20) + "..." : name;

  function increaseQuantity() {
    if (quantity < availableQuantity) {
      handleUpdateQuantity(id, quantity + 1);
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      handleUpdateQuantity(id, quantity - 1);
    }
  }

  return (
    <Container>
      <Amount>{quantity.toString().padStart(2, "0")}</Amount>
      <Name> {trimmedName} </Name>
      <span>({formatVietnameseCurrency(price)})</span>
      <div>
        <ButtonIcon disabled={quantity <= 1} onClick={decreaseQuantity}>
          <AiFillMinusCircle />
        </ButtonIcon>
        <ButtonIcon
          disabled={quantity >= availableQuantity}
          onClick={increaseQuantity}
        >
          <IoMdAddCircle />
        </ButtonIcon>
        <ButtonIcon onClick={() => handleRemoveItem(item)}>
          <HiTrash />
        </ButtonIcon>
      </div>
    </Container>
  );
}

export default MenuItemSummary;

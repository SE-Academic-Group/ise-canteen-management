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
  max-inline-size: 24ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Container = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.8rem;
  background-color: var(--color-grey-0);
  border: 1px dashed var(--color-grey-200);
  padding: 1.2rem;
  border-radius: 8px;

  &:not(:last-child) {
    margin-block-end: 0.8rem;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.24rem;
`;

const Price = styled.span``;

const Stacked = styled.div`
  display: grid;
  gap: 0.4rem;
`;

function MenuItemSummary({ item, handleRemoveItem, handleUpdateQuantity }) {
  const { price, quantity, name, availableQuantity, id } = item;

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
      <Stacked>
        <div>
          <Amount>{quantity.toString().padStart(2, "0")}</Amount>
          <Name> {name} </Name>
        </div>
        <Price>({formatVietnameseCurrency(price)})</Price>
      </Stacked>
      <Actions>
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
      </Actions>
    </Container>
  );
}

export default MenuItemSummary;

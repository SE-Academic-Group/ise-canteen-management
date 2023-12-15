import styled from "styled-components";
import { getImageUrl } from "../../utils/helpers";
import ButtonText from "../../ui/ButtonText";

const Container = styled.article`
  border: 1px solid var(--color-grey-300);
  padding: 1.2rem;
  border-radius: 8px;
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  font-size: 1.4rem;

  & > *:not(:last-child) {
    margin-bottom: 0.4rem;
  }

  & p {
    margin-block-end: 0.4rem;
  }
`;

const Image = styled.img`
  height: 160px;
  aspect-ratio: 1 / 1;
  border-radius: 2px;
  background-color: var(--color-grey-0);
`;

const Name = styled.h4`
  font-size: 1.6rem;
  font-weight: 500;
  text-wrap: balance;
  padding-inline: 0.4rem;
`;

const Link = styled.a`
  text-decoration: underline;
  color: var(--color-brand-500);
`;

function MenuItem({ menuItem = {} }) {
  const { productId, totalQuantity, remainQuantity } = menuItem;
  const soldQuantity = totalQuantity - remainQuantity;

  if (!productId) {
    return null;
  }

  const { name, image } = productId;

  return (
    <Container>
      <Image src={getImageUrl(image)} alt={name} />
      <Name>{name}</Name>
      <div>
        <p>
          Đã bán: {soldQuantity} / {totalQuantity}
        </p>
        <Link href={`/products/${productId._id}`}>
          <ButtonText>Xem chi tiết</ButtonText>
        </Link>
      </div>
    </Container>
  );
}

export default MenuItem;

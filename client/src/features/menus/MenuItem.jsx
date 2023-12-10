import styled from "styled-components";

const Container = styled.article`
  border: 1px solid var(--color-grey-300);
  padding: 1.2rem;
  border-radius: 4px;
  background-color: var(--color-grey-50);
  display: flex;
  flex-direction: column;
  align-items: center;

  & > *:not(:last-child) {
    margin-bottom: 0.4rem;
  }
`;

const Image = styled.img`
  height: 160px;
  aspect-ratio: 1 / 1;
  border-radius: 2px;
  background-color: var(--color-grey-0);
`;

const Name = styled.h4`
  font-size: 1.8rem;
  font-weight: 500;
  text-align: center;
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

  return (
    <Container>
      <Image
        src="http://localhost:6969/images/products/banh-mi-pate.jpg"
        alt="banh-mi-pate"
      />
      <Name>name of the product</Name>
      <p>
        Đã bán: {soldQuantity} / {totalQuantity}
      </p>
      <Link href={`/products/${productId}`}>Chi tiết sản phẩm</Link>
    </Container>
  );
}

export default MenuItem;

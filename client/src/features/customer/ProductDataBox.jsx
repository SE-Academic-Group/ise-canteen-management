import { HiOutlineCurrencyDollar } from "react-icons/hi";
import {
  MdOutlineCategory,
  MdOutlineDescription,
  MdOutlineDriveFileRenameOutline,
  MdOutlineStarBorderPurple500,
  MdNotes,
} from "react-icons/md";
import styled from "styled-components";

import DataItem from "../../ui/DataItem";

import { formatVietnameseCurrency, getImageUrl } from "../../utils/helpers";
import { translator } from "../../utils/translator";
import CreateProductReviewForm from "./CreateProductReviewForm";
import ProductReviews from "./ProductReviews";

const StyledProductDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem 4rem;
  margin-block: 1.6rem;

  overflow: hidden;
  font-size: 1.4rem;

  & > :not(:last-child) {
    margin-block-end: 1.6rem;
  }
`;

const Img = styled.img`
  margin-inline: auto;
  width: 200px;
  margin: 0.4rem;
  border: 1px solid var(--color-grey-200);
  aspect-ratio: 1 / 1;
  background-color: var(--color-grey-200);
  border-radius: 8px;
`;

function ProductDataBox({ product }) {
  const {
    _id: productId,
    name,
    price,
    category,
    ratingAverage,
    image,
    description,
  } = product;

  return (
    <StyledProductDataBox>
      <Img
        src={getImageUrl(image)}
        alt={name}
        width={100}
        height={100}
        decoding="async"
        loading="eager"
      />
      <section>
        <DataItem icon={<MdOutlineDriveFileRenameOutline />} label="">
          {name}
        </DataItem>
        <DataItem icon={<MdOutlineDescription />} label="">
          {description}
        </DataItem>
        <DataItem icon={<MdOutlineStarBorderPurple500 />} label="">
          {ratingAverage ?? "Chưa có đánh giá"}
        </DataItem>
        <DataItem icon={<MdOutlineCategory />} label="">
          {translator("category", category)}
        </DataItem>
        <DataItem icon={<HiOutlineCurrencyDollar />} label="">
          {formatVietnameseCurrency(price)}
        </DataItem>

        {category === "food" && (
          <DataItem icon={<MdNotes />} label="">
            Nếu món ăn là cơm phần, thì cơm sẽ được mặc định và có thể dùng cơm
            thêm.
          </DataItem>
        )}
      </section>

      <ProductReviews productId={productId} />

      <CreateProductReviewForm productId={productId} />
    </StyledProductDataBox>
  );
}

export default ProductDataBox;

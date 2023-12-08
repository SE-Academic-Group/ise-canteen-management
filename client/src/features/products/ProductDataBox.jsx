import { HiOutlineCurrencyDollar } from "react-icons/hi";
import {
  MdOutlineCategory,
  MdOutlineDescription,
  MdOutlineDriveFileRenameOutline,
  MdOutlineStarBorderPurple500,
} from "react-icons/md";
import styled from "styled-components";

import DataItem from "../../ui/DataItem";
import Heading from "../../ui/Heading";

import { IMAGE_URL } from "../../utils/constants";
import { formatVietnameseCurrency } from "../../utils/helpers";
import { categoryToVietnamese } from "../../utils/translator";
import StyledReviewsBox from "../../ui/ReviewsBox";
import ReviewItem from "../../ui/ReviewItem";

const StyledProductDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
`;

const Section = styled.section`
  padding: 3.2rem 4rem;

  --_image-size: 200px;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: var(--_image-size) 1fr;
  gap: 3.2rem;
  margin-block-end: 1.6rem;
`;

const Img = styled.img`
  width: var(--_img-size);
  margin: 0.4rem;
  border: 1px solid var(--color-grey-200);
  aspect-ratio: 1 / 1;
  background-color: var(--color-grey-200);
  border-radius: 8px;
`;

const Price = styled.div`
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: var(--color-green-100);
  color: var(--color-green-700);

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

function ProductDataBox({ product }) {
  const { name, price, category, ratingAverage, image, description } = product;

  return (
    <StyledProductDataBox>
      <Header>
        <Heading as="h2">{name}</Heading>
      </Header>

      <Section>
        <Layout>
          <Img
            src={IMAGE_URL + image}
            alt={name}
            width={200}
            height={200}
            decoding="async"
            loading="eager"
          />

          <section>
            <DataItem
              icon={<MdOutlineDriveFileRenameOutline />}
              label="Tên sản phẩm"
            >
              {name}
            </DataItem>
            <DataItem icon={<MdOutlineDescription />} label="Mô tả">
              {description}
            </DataItem>
            <DataItem icon={<MdOutlineStarBorderPurple500 />} label="Đánh giá">
              {ratingAverage}
            </DataItem>
            <DataItem icon={<MdOutlineCategory />} label="Phân loại">
              {categoryToVietnamese(category)}
            </DataItem>
            <DataItem icon={<HiOutlineCurrencyDollar />} label="Giá tiền">
              {formatVietnameseCurrency(price)}
            </DataItem>
          </section>
        </Layout>

        <StyledReviewsBox>
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
        </StyledReviewsBox>

        <Price>
          <DataItem icon={<HiOutlineCurrencyDollar />} label="Giá tiền">
            {formatVietnameseCurrency(price)}
          </DataItem>
        </Price>
      </Section>
    </StyledProductDataBox>
  );
}

export default ProductDataBox;

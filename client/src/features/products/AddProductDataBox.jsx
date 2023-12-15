import styled from "styled-components";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import {
  MdOutlineCategory,
  MdOutlineDriveFileRenameOutline,
} from "react-icons/md";

import DataItem from "../../ui/DataItem";
import Tag from "../../ui/Tag";

import { CATEGORY_TAGS } from "../../constants/tags";
import { formatVietnameseCurrency } from "../../utils/helpers";

const Border = styled.article`
  border: 1px solid var(--color-grey-300);
  border-radius: 8px;
  padding: 3.2rem;
  margin-block-end: 2.4rem;
`;

function AddProductDataBox({ product }) {
  const { name, price, category } = product;
  const tag = CATEGORY_TAGS[category];

  return (
    <Border>
      <DataItem label="Tên sản phẩm" icon={<MdOutlineDriveFileRenameOutline />}>
        {name}
      </DataItem>
      <DataItem label="Loại sản phẩm" icon={<MdOutlineCategory />}>
        <Tag type={tag.type}>{tag.label}</Tag>
      </DataItem>
      <DataItem label="Giá bán" icon={<HiOutlineCurrencyDollar />}>
        {formatVietnameseCurrency(price)}
      </DataItem>
    </Border>
  );
}

export default AddProductDataBox;

import styled from "styled-components";

import { AiOutlineNumber } from "react-icons/ai";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import {
  MdOutlineCategory,
  MdOutlineDriveFileRenameOutline,
} from "react-icons/md";

import DataItem from "../../ui/DataItem";
import Tag from "../../ui/Tag";

import { translator } from "../../utils/translator";
import { CATEGORY_TAGS } from "../../constants/tags";

const Border = styled.article`
  border: 1px solid var(--color-grey-300);
  border-radius: 8px;
  padding: 3.2rem;
  margin-block-end: 2.4rem;
`;

function InventoryItemDataBox({
  item = {},
  importNumber = 0,
  isExport = false,
}) {
  const { name, category, stockAmount, price, unit } = item;
  const viUnit = translator("unit", unit);
  const tag = CATEGORY_TAGS[category];
  const newAmount = isExport
    ? stockAmount - importNumber
    : stockAmount + importNumber;
  const operator = isExport ? "-" : "+";

  return (
    <Border>
      <DataItem label="Tên sản phẩm" icon={<MdOutlineDriveFileRenameOutline />}>
        {name}
      </DataItem>
      <DataItem label="Loại sản phẩm" icon={<MdOutlineCategory />}>
        <Tag type={tag.type}>{tag.label}</Tag>
      </DataItem>
      <DataItem label="Số lượng tồn" icon={<AiOutlineNumber />}>
        {stockAmount} {viUnit}
      </DataItem>
      <DataItem label="Giá bán" icon={<HiOutlineCurrencyDollar />}>
        {price} / {viUnit}
      </DataItem>
      <hr />
      <DataItem label="Số lượng sau khi nhập" icon={<AiOutlineNumber />}>
        {stockAmount} {operator} {importNumber} = {newAmount} {viUnit}
      </DataItem>
    </Border>
  );
}

/**
 * name
 * category
 * current stock amount
 * price / unit
 */

export default InventoryItemDataBox;

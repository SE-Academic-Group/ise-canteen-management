import styled from "styled-components";
import {
  MdOutlineDescription,
  MdOutlineDriveFileRenameOutline,
  MdStarBorderPurple500,
} from "react-icons/md";
import DataItem from "./DataItem";

const StyledReviewItem = styled.article`
  background-color: var(--color-grey-200);
  padding: 1.2rem;
  border-radius: var(--border-radius-md);
  font-size: 1.4rem;
`;

function ReviewItem() {
  return (
    <StyledReviewItem>
      <DataItem icon={<MdOutlineDriveFileRenameOutline />} label="Từ">
        Nguyen Van A, 20/10/2021 20:20
      </DataItem>
      <DataItem icon={<MdStarBorderPurple500 />} label="Đánh giá">
        5 sao
      </DataItem>
      <DataItem icon={<MdOutlineDescription />} label="Nội dung">
        Sản phẩm rất tốt
      </DataItem>
    </StyledReviewItem>
  );
}

export default ReviewItem;

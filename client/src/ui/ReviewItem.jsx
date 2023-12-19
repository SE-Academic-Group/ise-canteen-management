import styled from "styled-components";
import {
  MdOutlineDescription,
  MdOutlineDriveFileRenameOutline,
  MdStarBorderPurple500,
} from "react-icons/md";
import DataItem from "./DataItem";

const StyledReviewItem = styled.article`
  background-color: var(--color-grey-0);
  padding: 1.2rem;
  border-radius: var(--border-radius-md);
  font-size: 1.4rem;
`;

function ReviewItem({ review }) {
  const { review: content, rating, createdAt, userId } = review;

  return (
    <StyledReviewItem>
      <DataItem icon={<MdOutlineDriveFileRenameOutline />} label="Từ">
        {userId?.name ?? "Khách"}, {new Date(createdAt).toLocaleString("vi-VN")}
      </DataItem>
      <DataItem icon={<MdStarBorderPurple500 />} label="Đánh giá">
        {rating} sao
      </DataItem>
      <DataItem icon={<MdOutlineDescription />} label="Nội dung">
        {content}
      </DataItem>
    </StyledReviewItem>
  );
}

export default ReviewItem;

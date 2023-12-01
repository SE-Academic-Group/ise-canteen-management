import { HiMiniArrowPath } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";

const Button = styled(ButtonIcon)`
  &:hover {
    background-color: var(--color-grey-200);
  }

  & svg {
    color: var(--color-grey-600);
  }
`;

export default function ResetURLButton() {
  const [, setSearchParams] = useSearchParams();

  function handleClick() {
    setSearchParams({});
  }

  return (
    <Button onClick={handleClick}>
      <span className="sr-only">Làm mới bộ lọc, tìm kiếm và sắp xếp</span>
      <HiMiniArrowPath role="presentation" />
    </Button>
  );
}

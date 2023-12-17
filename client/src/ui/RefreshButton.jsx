import { HiMiniArrowPath } from "react-icons/hi2";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { useQueryClient } from "@tanstack/react-query";

const Button = styled(ButtonIcon)`
  &:hover {
    background-color: var(--color-grey-200);
  }

  & svg {
    color: var(--color-grey-600);
  }
`;

export default function RefreshButton({ queryKey }) {
  const queryClient = useQueryClient();

  function handleClick() {
    queryClient.invalidateQueries(queryKey);
  }

  return (
    <Button onClick={handleClick}>
      <span className="sr-only">Làm mới nội dung</span>
      <HiMiniArrowPath role="presentation" />
    </Button>
  );
}

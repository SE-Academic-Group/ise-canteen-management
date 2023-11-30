import { HiMiniArrowPath } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";

export default function ResetURLButton() {
  return (
    <ButtonIcon>
      <span className="sr-only">Làm mới bộ lọc, tìm kiếm và sắp xếp</span>
      <HiMiniArrowPath />
    </ButtonIcon>
  );
}

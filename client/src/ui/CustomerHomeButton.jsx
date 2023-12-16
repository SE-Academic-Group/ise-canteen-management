import { useNavigate } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";
import { RiHome4Fill } from "react-icons/ri";

function CustomerHomeButton() {
  const navigate = useNavigate();

  return (
    <ButtonIcon onClick={() => navigate("/customer-order")}>
      <RiHome4Fill />
    </ButtonIcon>
  );
}

export default CustomerHomeButton;

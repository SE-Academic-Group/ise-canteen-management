import { useNavigate } from "react-router-dom";
import { RiHome4Fill } from "react-icons/ri";
import ButtonIcon from "./ButtonIcon";

function CustomerHomeButton() {
  const navigate = useNavigate();

  return (
    <ButtonIcon onClick={() => navigate("/customer/order")}>
      <RiHome4Fill />
    </ButtonIcon>
  );
}

export default CustomerHomeButton;

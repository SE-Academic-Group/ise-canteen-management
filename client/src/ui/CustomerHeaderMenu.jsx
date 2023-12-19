import styled from "styled-components";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdWorkHistory } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function CustomerHeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/customer/deposit")}>
          <RiMoneyDollarCircleFill />
        </ButtonIcon>
      </li>
      <li>
        <ButtonIcon onClick={() => navigate("/customer/orders")}>
          <MdWorkHistory />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}

export default CustomerHeaderMenu;

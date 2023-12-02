import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogout } from "./useLogout";
import { useUser } from "./useUser";

function Logout() {
  const { isLoading, logout } = useLogout();
  const { clearUser } = useUser();

  function handleLogout() {
    clearUser();
    logout();
  }

  return (
    <ButtonIcon onClick={handleLogout}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;

import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const isLoading = false;

  function handleSubmit(e) {
    e.preventDefault();
    console.log("logout");
  }

  return (
    <form onSubmit={handleSubmit}>
      <ButtonIcon>
        {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
      </ButtonIcon>
    </form>
  );
}

export default Logout;

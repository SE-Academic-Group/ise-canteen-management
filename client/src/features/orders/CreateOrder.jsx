import Button from "../../ui/Button";
import { NavLink } from "react-router-dom";

function CreateOrder() {
  return (
    <div>
      <Button>
        <NavLink to="/create-order">Tạo đơn hàng</NavLink>
      </Button>
    </div>
  );
}

export default CreateOrder;

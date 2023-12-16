import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

function CreateOrder() {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/create-order")}>Tạo đơn hàng</Button>
    </div>
  );
}

export default CreateOrder;

import { useTodayMenu } from "./useTodayMenu";
import { useCloseTodayMenu } from "./useCloseTodayMenu";
import { useCreateTodayMenu } from "./useCreateTodayMenu";

import FlexContainer from "../../ui/FlexContainer";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useNavigate } from "react-router-dom";

function TodayMenuActions() {
  const navigate = useNavigate();
  const { isAlreadyCreated } = useTodayMenu();
  const { isClosing, closeTodayMenu } = useCloseTodayMenu();
  const { isCreating, createTodayMenu } = useCreateTodayMenu();
  const isWorking = isClosing || isCreating;

  return (
    <FlexContainer>
      <Modal>
        {isAlreadyCreated ? (
          <>
            <Button onClick={() => navigate("/products")} disabled={isWorking}>
              Thêm sản phẩm
            </Button>
            <Modal.Open opens="close-today-menu">
              <Button variation="danger">Đóng thực đơn hôm nay</Button>
            </Modal.Open>
          </>
        ) : (
          <Button
            onClick={() => {
              createTodayMenu([]);
              navigate("/products");
            }}
            disabled={isWorking}
          >
            Tạo thực đơn hôm nay
          </Button>
        )}

        <Modal.Window name="close-today-menu">
          <ConfirmDelete
            title="Đóng thực đơn hôm nay"
            description="Bạn có chắc muốn đóng thực đơn hôm nay"
            onConfirm={closeTodayMenu}
            disabled={isWorking}
          />
        </Modal.Window>
      </Modal>
    </FlexContainer>
  );
}

export default TodayMenuActions;

import Button from "../../ui/Button";
import FlexContainer from "../../ui/FlexContainer";
import { useTodayMenu } from "./useTodayMenu";
import { useCloseTodayMenu } from "./useCloseTodayMenu";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

function TodayMenuActions() {
  const { isAlreadyCreated } = useTodayMenu();
  const { isClosing, closeTodayMenu } = useCloseTodayMenu();
  const isWorking = isClosing;

  return (
    <FlexContainer>
      <Modal>
        {isAlreadyCreated ? (
          <Modal.Open opens="close-today-menu">
            <Button variation="danger">Đóng thực đơn hôm nay</Button>
          </Modal.Open>
        ) : (
          <Button>Tạo thực đơn hôm nay</Button>
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

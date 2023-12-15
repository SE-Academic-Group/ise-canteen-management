import Button from "../../ui/Button";
import FlexContainer from "../../ui/FlexContainer";
import { useTodayMenu } from "./useTodayMenu";

function TodayMenuActions() {
  const { isAlreadyCreated } = useTodayMenu();

  return (
    <FlexContainer>
      {isAlreadyCreated ? (
        <Button variation="danger">Đóng thực đơn hôm nay</Button>
      ) : (
        <Button>Tạo thực đơn hôm nay</Button>
      )}
    </FlexContainer>
  );
}

export default TodayMenuActions;

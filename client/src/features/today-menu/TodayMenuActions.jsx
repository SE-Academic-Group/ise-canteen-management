import Button from "../../ui/Button";
import FlexContainer from "../../ui/FlexContainer";

function TodayMenuActions() {
  return (
    <FlexContainer>
      <Button>Tạo thực đơn hôm nay</Button>
      <Button variation="danger">Đóng thực đơn hôm nay</Button>
    </FlexContainer>
  );
}

export default TodayMenuActions;

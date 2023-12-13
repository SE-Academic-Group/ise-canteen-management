import { useMenuHistory } from "./useMenuHistory";
import { useMoveBack } from "../../hooks/useMoveBack";

import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Row from "../../ui/Row";

import ButtonGroup from "../../ui/ButtonGroup";
import MenuDataBox from "./MenuDataBox";
import Button from "../../ui/Button";
import ErrorLoading from "../../ui/ErrorLoading";

function MenuDetail() {
  const moveBack = useMoveBack();
  const { menuHistory, error, isLoading } = useMenuHistory();

  if (error) {
    return <ErrorLoading error={error} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!menuHistory) {
    return <Empty resourceName="Thực đơn" />;
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Chi tiết thực đơn </Heading>
        <ButtonText onClick={moveBack}>
          <span role="presentation">&larr;</span>
          <span>Quay lại</span>
        </ButtonText>
      </Row>

      <MenuDataBox menuHistory={menuHistory} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Quay lại
        </Button>
      </ButtonGroup>
    </>
  );
}

export default MenuDetail;

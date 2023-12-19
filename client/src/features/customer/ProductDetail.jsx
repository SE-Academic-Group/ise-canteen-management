import { useMoveBack } from "../../hooks/useMoveBack";
import { useProduct } from "../products/useProduct";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Empty from "../../ui/Empty";
import ErrorLoading from "../../ui/ErrorLoading";
import Spinner from "../../ui/Spinner";
import ProductDataBox from "./ProductDataBox";

function ProductDetail() {
  const moveBack = useMoveBack();
  const { product, isLoading, error } = useProduct();

  if (error) return <ErrorLoading error={error} />;

  if (isLoading) return <Spinner />;

  if (!product) return <Empty resourceName="Sản phẩm" />;

  return (
    <div>
      <ButtonGroup>
        <ButtonText onClick={moveBack}>
          <span role="presentation">&larr;</span>
          <span>Quay lại</span>
        </ButtonText>
      </ButtonGroup>

      <ProductDataBox product={product} />

      <ButtonGroup>
        <Button onClick={moveBack} variation="secondary">
          <span role="presentation">&larr;</span>
          <span>Quay lại</span>
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default ProductDetail;

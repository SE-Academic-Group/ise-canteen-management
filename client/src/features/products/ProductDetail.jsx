import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useProduct } from "./useProduct";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useDeleteProduct } from "./useDeleteProduct";

import ConfirmDelete from "../../ui/ConfirmDelete";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import Empty from "../../ui/Empty";
import Modal from "../../ui/Modal";
import Tag from "../../ui/Tag";
import Row from "../../ui/Row";
import ProductDataBox from "./ProductDataBox";

import ErrorLoading from "../../ui/ErrorLoading";
import AddProductToTodayMenuForm from "./AddProductToTodayMenuForm";
import { CATEGORY_TAGS } from "../../constants/tags";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function ProductDetail() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { product, isLoading, error } = useProduct();
  const { isDeleting, deleteProduct } = useDeleteProduct();
  const isWorking = isDeleting;

  if (error) return <ErrorLoading error={error} />;

  if (isLoading) return <Spinner />;

  if (!product) return <Empty resourceName="Sản phẩm" />;

  const { category, _id: productId } = product;
  const tag = CATEGORY_TAGS[category];

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Sản phẩm #{productId}</Heading>
          <Tag type={tag.type}>{tag.label}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>
          <span role="presentation">&larr;</span>
          <span>Quay lại</span>
        </ButtonText>
      </Row>

      <ProductDataBox product={product} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="add-to-menu">
            <Button>Thêm vào thực đơn hôm nay</Button>
          </Modal.Open>
          <Modal.Open opens="delete">
            <Button variation="danger" disabled={isWorking}>
              Xóa sản phẩm
            </Button>
          </Modal.Open>

          <Modal.Window name="add-to-menu">
            <AddProductToTodayMenuForm productToAdd={product} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="sản phẩm"
              disabled={isWorking}
              onConfirm={() => {
                deleteProduct(productId);
                navigate("/products");
              }}
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Quay lại
        </Button>
      </ButtonGroup>
    </>
  );
}

export default ProductDetail;

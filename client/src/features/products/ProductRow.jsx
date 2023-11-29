import { HiCheckBadge, HiPencil, HiTrash } from "react-icons/hi2";
import styled from "styled-components";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

import { formatVietnameseCurrency } from "../../utils/helpers";
import CreateProductForm from "./CreateProductForm";
import { useDeleteProduct } from "./useDeleteProduct";

const Name = styled.div`
  font-weight: 600;
  color: var(--color-grey-600);
  word-break: break-all;
`;

const Amount = styled.div`
  font-weight: 500;
`;

const Img = styled.img`
  display: block;
  width: 100px;
  aspect-ratio: 25 / 16;
  object-fit: cover;
  object-position: center;
  background-color: var(--color-grey-200);
  transform: scale(1.25) translateX(-7px);
  border-radius: 1px;
  font-size: 0.8rem;
  font-style: italic;
`;

const Description = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
`;

const Rating = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
`;

const categoryToTagName = {
  food: "green",
  drink: "blue",
  other: "grey",
};

const vietnameseCategory = {
  food: "Đồ ăn",
  drink: "Nước uống",
  other: "Khác",
};

function ProductRow({ product }) {
  const { id, name, price, description, category, image, ratingAverage } =
    product;
  const { isDeleting, deleteProduct } = useDeleteProduct();
  const isAddingToMenu = false;
  const isWorking = isDeleting || isAddingToMenu;

  return (
    <Table.Row>
      <Img src={image} width={100} height={64} />

      <Name>{name}</Name>

      <Amount>{formatVietnameseCurrency(price)}</Amount>

      <Description>{description}</Description>

      <Tag type={categoryToTagName[category]}>
        {vietnameseCategory[category].replace("-", " ")}
      </Tag>

      <Rating>{ratingAverage?.toFixed(1) ?? "__"}</Rating>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button icon={<HiCheckBadge />}>
              Thêm vào thực đơn
            </Menus.Button>

            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Cập nhật</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Xóa sản phẩm</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="edit">
          <CreateProductForm productToEdit={product} />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="sản phẩm"
            disabled={isWorking}
            onConfirm={() => deleteProduct(id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default ProductRow;

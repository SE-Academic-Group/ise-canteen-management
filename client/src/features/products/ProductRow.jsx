import { HiCheckBadge, HiEye, HiPencil, HiTrash } from "react-icons/hi2";

import { useNavigate } from "react-router-dom";
import { useDeleteProduct } from "./useDeleteProduct";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";
import EditProductForm from "./EditProductForm";

import { CATEGORY_TAGS } from "../../constants/tags";
import AddProductToTodayMenuForm from "./AddProductToTodayMenuForm";

function ProductRow({ product }) {
  const navigate = useNavigate();
  const { _id, name, price, description, category, image, ratingAverage } =
    product;
  const { isDeleting, deleteProduct } = useDeleteProduct();
  const isAddingToMenu = false;
  const isWorking = isDeleting || isAddingToMenu;
  const tag = CATEGORY_TAGS[category];

  return (
    <Table.Row>
      <Table.Column.Img src={image} width={100} height={100} />
      <Table.Column.Name>{name}</Table.Column.Name>
      <Table.Column.Amount>{price}</Table.Column.Amount>
      <Table.Column.Description>{description}</Table.Column.Description>
      <Tag type={tag.type}>{tag.label}</Tag>
      <Table.Column.Rating>{ratingAverage}</Table.Column.Rating>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={_id} />
          <Menus.List id={_id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/products/${_id}`)}
            >
              Xem chi tiết
            </Menus.Button>

            <Modal.Open opens="add-to-menu">
              <Menus.Button icon={<HiCheckBadge />}>
                Thêm vào thực đơn
              </Menus.Button>
            </Modal.Open>

            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Cập nhật</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Xóa sản phẩm</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="edit">
          <EditProductForm productToEdit={product} />
        </Modal.Window>

        <Modal.Window name="add-to-menu">
          <AddProductToTodayMenuForm productToAdd={product} />
        </Modal.Window>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="sản phẩm"
            disabled={isWorking}
            onConfirm={() => deleteProduct(_id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default ProductRow;

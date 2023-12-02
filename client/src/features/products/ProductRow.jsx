import { HiCheckBadge, HiPencil, HiTrash } from "react-icons/hi2";

import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

import { formatVietnameseCurrency } from "../../utils/helpers";
import { categoryToVietnamese } from "../../utils/translator";
import CreateProductForm from "./CreateProductForm";
import { useDeleteProduct } from "./useDeleteProduct";

const categoryToTagName = {
  food: "green",
  drink: "blue",
  other: "grey",
};

function ProductRow({ product }) {
  const { id, name, price, description, category, image, ratingAverage } =
    product;
  const { isDeleting, deleteProduct } = useDeleteProduct();
  const isAddingToMenu = false;
  const isWorking = isDeleting || isAddingToMenu;

  return (
    <Table.Row>
      <Table.Column.Img src={image} width={100} height={64} />
      <Table.Column.Name>{name}</Table.Column.Name>
      <Table.Column.Amount>
        {formatVietnameseCurrency(price)}
      </Table.Column.Amount>
      <Table.Column.Description>{description}</Table.Column.Description>
      <Tag type={categoryToTagName[category]}>
        {categoryToVietnamese(category)}
      </Tag>
      <Table.Column.Rating>
        {ratingAverage?.toFixed(1) ?? "__"}
      </Table.Column.Rating>

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

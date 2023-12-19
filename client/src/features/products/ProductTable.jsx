import Pagination from "../../ui/Pagination";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import ProductRow from "./ProductRow";

import { useProducts } from "./useProducts";
import Progressing from "../../ui/Progressing";

export default function ProductTable() {
  const state = useProducts();
  const { count, products } = state;

  return (
    <Progressing {...state} resourceName="Sản phẩm">
      <Menus>
        <Table columns="100px 20ch 10ch 3fr 12ch 10ch 3.2rem">
          <Table.Header>
            <div>Ảnh</div>
            <div>Tên sản phẩm</div>
            <div>Giá</div>
            <div>Mô tả</div>
            <div>Phân loại</div>
            <div>Đánh giá</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={products}
            render={(product) => (
              <ProductRow key={product._id} product={product} />
            )}
          />

          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        </Table>
      </Menus>
    </Progressing>
  );
}

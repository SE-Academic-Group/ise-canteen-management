import AddProduct from "../features/products/AddProduct";
import CreateProductForm from "../features/products/CreateProductForm";
import ProductTable from "../features/products/ProductTable";
import ProductTableOperations from "../features/products/ProductTableOperations";

import BackgroundHeading from "../ui/BackgroundHeading";

function Products() {
  return (
    <>
      <BackgroundHeading as="h1">Quản lý sản phẩm</BackgroundHeading>
      <ProductTableOperations />
      {/* <CreateProductForm /> */}
      <ProductTable />
      <AddProduct />
    </>
  );
}

export default Products;

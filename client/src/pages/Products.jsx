import AddProduct from "../features/products/AddProduct";
import ProductTable from "../features/products/ProductTable";
import ProductTableOperations from "../features/products/ProductTableOperations";
import BackgroundHeading from "../ui/BackgroundHeading";

function Products() {
  return (
    <>
      <BackgroundHeading as="h1">Quản lý sản phẩm</BackgroundHeading>
      <ProductTableOperations />
      <ProductTable />
      <AddProduct />
    </>
  );
}

export default Products;

import AddProduct from "../features/products/AddProduct";
import ProductTable from "../features/products/ProductTable";
import ProductTableOperations from "../features/products/ProductTableOperations";
import PageHeading from "../ui/PageHeading";

function Products() {
  return (
    <>
      <PageHeading>Quản lý sản phẩm</PageHeading>
      <ProductTableOperations />
      <ProductTable />
      <AddProduct />
    </>
  );
}

export default Products;

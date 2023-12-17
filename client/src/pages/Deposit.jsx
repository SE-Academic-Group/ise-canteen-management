import DepositSteps from "../features/deposit/DepositSteps";
import PageHeading from "../ui/PageHeading";

function Products() {
  return (
    <>
      <PageHeading noReset>Nạp tiền vào tài khoản</PageHeading>
      <DepositSteps />
    </>
  );
}

export default Products;

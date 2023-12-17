import PageHeading from "../ui/PageHeading";
import VnPayDeposit from "../features/customer/VnPayDeposit";
import VnPayDepositGuide from "../features/customer/VnPayDepositGuide";
import CustomerBalanceState from "../features/customer/CustomerBalanceState";

function CustomerDeposit() {
  return (
    <>
      <PageHeading noReset>Nạp tiền vào tài khoản</PageHeading>
      <CustomerBalanceState />
      <VnPayDepositGuide />
      <VnPayDeposit />
    </>
  );
}

export default CustomerDeposit;

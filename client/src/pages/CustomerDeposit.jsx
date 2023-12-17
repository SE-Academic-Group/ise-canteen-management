import PageHeading from "../ui/PageHeading";
import VnPayDeposit from "../features/customer/VnPayDeposit";
import VnPayDepositGuide from "../features/customer/VnPayDepositGuide";
import CustomerBalanceState from "../features/customer/CustomerBalanceState";
import CustomerChargeHistory from "../features/customer/CustomerChargeHistory";

function CustomerDeposit() {
  return (
    <>
      <PageHeading noReset>Nạp tiền vào tài khoản</PageHeading>
      <CustomerBalanceState />
      <VnPayDepositGuide />
      <VnPayDeposit />
      <PageHeading noReset>Lịch sử nạp tiền gần đây</PageHeading>
      <CustomerChargeHistory />
    </>
  );
}

export default CustomerDeposit;

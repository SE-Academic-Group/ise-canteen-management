import { useUser } from "../features/authentication/useUser";
import MyOrders from "../features/customer/MyOrders";
import PageHeading from "../ui/PageHeading";
import { QUERY_KEYS } from "../constants/keys";

function CustomerOrders() {
  const { user } = useUser();

  return (
    <>
      <PageHeading noReset queryKey={[QUERY_KEYS.ORDERS, user._id]}>
        Lịch sử đặt hàng
      </PageHeading>
      <MyOrders />
    </>
  );
}

export default CustomerOrders;

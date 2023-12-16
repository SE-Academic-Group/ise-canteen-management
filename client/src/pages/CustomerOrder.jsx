import CreateOrder from "../features/customer/CreateOrder";
import CreateOrderHeading from "../features/customer/CreateOrderHeading";
import TodayMenuFilter from "../features/customer/CustomerTodayMenuFilter";

function CustomerOrder() {
  return (
    <div>
      <CreateOrderHeading />
      <TodayMenuFilter />
      <CreateOrder />
    </div>
  );
}

export default CustomerOrder;

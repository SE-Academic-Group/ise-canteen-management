import { HiOutlineCube, HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import Stat from "./Stat";

function Stats({ noUsers, noOrders, noProducts }) {
  return (
    <>
      <Stat
        title="Số lượng người dùng trong hệ thống"
        color="blue"
        icon={<FaRegUser />}
        value={noUsers}
      />
      <Stat
        title="Số đơn hàng đã bán"
        color="green"
        icon={<HiOutlineShoppingBag />}
        value={noOrders}
      />
      <Stat
        title="Số sản phẩm căn tin phục vụ"
        color="indigo"
        icon={<HiOutlineCube />}
        value={noProducts}
      />
    </>
  );
}

export default Stats;

import styled from "styled-components";

import { HiOutlineCube, HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import Stat from "./Stat";

const StyledStatsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2.4rem;
`;

function Stats({ noUsers, noOrders, noProducts, noCustomers }) {
  return (
    <StyledStatsLayout>
      <Stat
        title="Số lượng người dùng trong hệ thống"
        color="blue"
        icon={<FaRegUser />}
        value={noUsers}
      />
      <Stat
        title="Số lượng khách hàng có tài khoản"
        color="silver"
        icon={<FaRegUser />}
        value={noCustomers}
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
    </StyledStatsLayout>
  );
}

export default Stats;

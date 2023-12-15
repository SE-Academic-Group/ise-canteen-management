import TableOperations from "../../ui/TableOperations";
import FlexContainer from "../../ui/FlexContainer";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import { getToday } from "../../utils/helpers";

function OrderTableOperations() {
  const today = getToday();

  return (
    <TableOperations between>
      <FlexContainer>
        <Filter
          filterField="orderDate"
          options={[
            { value: "all", label: "Tất cả" },
            { value: today, label: "Hôm nay" },
          ]}
        />

        <Filter
          filterField="orderStatus"
          options={[
            { value: "all", label: "Tất cả" },
            { value: "success", label: "Chưa xử lý" },
            { value: "preparing", label: "Đang chuẩn bị" },
            { value: "completed", label: "Hoàn thành" },
            { value: "cancelled", label: "Bị hủy" },
          ]}
        />
      </FlexContainer>

      <SortBy
        options={[
          { value: "orderDate-desc", label: "Sắp xếp theo ngày đặt (gần đây)" },
          { value: "orderDate-asc", label: "Sắp xếp theo ngày đặt (cũ)" },
        ]}
      />
    </TableOperations>
  );
}

export default OrderTableOperations;

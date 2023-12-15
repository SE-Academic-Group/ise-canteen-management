import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function OrderTableOperations() {
  return (
    <TableOperations between>
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

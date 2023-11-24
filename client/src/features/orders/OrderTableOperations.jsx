import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function OrderTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="orderDate"
        options={[
          { value: "all", label: "Tất cả" },
          { value: "today", label: "Hôm nay" },
        ]}
      />

      <Filter
        filterField="orderStatus"
        options={[
          { value: "all", label: "Tất cả" },
          { value: "pending", label: "Chờ" },
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

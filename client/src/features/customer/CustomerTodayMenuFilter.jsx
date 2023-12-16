import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function CustomerTodayMenuFilter() {
  return (
    <TableOperations between>
      <Filter
        filterField="category"
        options={[
          { value: "all", label: "Tất cả" },
          { value: "food", label: "Đồ ăn" },
          { value: "beverage", label: "Nước uống" },
          { value: "other", label: "Khác" },
        ]}
      />
      <span></span>
    </TableOperations>
  );
}

export default CustomerTodayMenuFilter;

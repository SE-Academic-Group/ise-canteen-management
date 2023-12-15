import Filter from "../../ui/Filter";
import SearchBox from "../../ui/SearchBox";
import TableOperations from "../../ui/TableOperations";

function TodayMenuFilter() {
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
      <SearchBox />
    </TableOperations>
  );
}

export default TodayMenuFilter;

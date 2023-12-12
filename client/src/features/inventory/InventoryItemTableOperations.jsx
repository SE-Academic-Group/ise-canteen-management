import TableOperations from "../../ui/TableOperations";
import FlexContainer from "../../ui/FlexContainer";
import SearchBox from "../../ui/SearchBox";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function InventoryTableOperations() {
  return (
    <TableOperations between>
      <Filter
        filterField="category"
        options={[
          { value: "all", label: "Tất cả" },
          { value: "ingredient", label: "Nguyên liệu" },
          { value: "spice", label: "Gia vị" },
          { value: "drink", label: "Nước" },
          { value: "other", label: "Khác" },
        ]}
      />

      <FlexContainer>
        <SortBy
          options={[
            { value: "default", label: "Sắp xếp mặc định" },
            { value: "name-asc", label: "Sắp xếp theo tên (A-Z)" },
            { value: "name-desc", label: "Sắp xếp theo tên (Z-A)" },
            {
              value: "createdAt-desc",
              label: "Sắp xếp theo ngày tạo (gần đây)",
            },
            { value: "createdAt-asc", label: "Sắp xếp theo ngày tạo (cũ)" },
          ]}
        />
        <SearchBox />
      </FlexContainer>
    </TableOperations>
  );
}

export default InventoryTableOperations;

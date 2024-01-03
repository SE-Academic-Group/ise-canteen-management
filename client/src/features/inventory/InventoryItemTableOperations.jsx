import SelectFIlter from "../../ui/SelectFIlter";
import SearchBox from "../../ui/SearchBox";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function InventoryTableOperations() {
  return (
    <TableOperations end="true">
      <SelectFIlter
        filterField={"category"}
        options={[
          { value: "all", label: "Tất cả phân loại" },
          { value: "food", label: "Thực phẩm" },
          { value: "beverage", label: "Nước" },
          { value: "ingredient", label: "Nguyên liệu" },
          { value: "spice", label: "Gia vị" },
          { value: "seasoning", label: "Hương liệu" },
          { value: "condiment", label: "Đi kèm" },
          { value: "herb", label: "Rau nêm" },
          { value: "other", label: "Khác" },
        ]}
      />

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
    </TableOperations>
  );
}

export default InventoryTableOperations;

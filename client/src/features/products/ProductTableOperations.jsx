import TableOperations from "../../ui/TableOperations";
import FlexContainer from "../../ui/FlexContainer";
import SearchBox from "../../ui/SearchBox";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function ProductTableOperations() {
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

      <FlexContainer>
        <SortBy
          options={[
            { value: "default", label: "Sắp xếp mặc định" },
            {
              value: "ratingAverage-desc",
              label: "Sắp xết theo đanh giá (cao)",
            },
            {
              value: "ratingAverage-asc",
              label: "Sắp xếp theo đánh giá (thấp)",
            },
          ]}
        />

        <SearchBox />
      </FlexContainer>
    </TableOperations>
  );
}

export default ProductTableOperations;

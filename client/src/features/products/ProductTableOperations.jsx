import Filter from "../../ui/Filter";
import FlexContainer from "../../ui/FlexContainer";
import SearchBox from "../../ui/SearchBox";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function ProductTableOperations() {
  return (
    <TableOperations between>
      <Filter
        filterField="category"
        options={[
          { value: "all", label: "Tất cả" },
          { value: "food", label: "Đồ ăn" },
          { value: "drink", label: "Nước uống" },
          { value: "other", label: "Khác" },
        ]}
      />

      <FlexContainer>
        <SortBy
          options={[
            { value: "id-asc", label: "Sắp xếp mặc định" },
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

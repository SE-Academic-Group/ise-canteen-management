import styled from "styled-components";

import TableOperations from "../../ui/TableOperations";
import FlexContainer from "../../ui/FlexContainer";
import SearchBox from "../../ui/SearchBox";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const StyledProductTableOperations = styled(TableOperations)`
  justify-content: space-between;
`;

function ProductTableOperations() {
  return (
    <StyledProductTableOperations>
      <Filter
        filterField="category"
        options={[
          { value: "all", label: "Tất cả" },
          { value: "food", label: "Đồ ăn" },
          { value: "drink", label: "Nước uống" },
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
    </StyledProductTableOperations>
  );
}

export default ProductTableOperations;

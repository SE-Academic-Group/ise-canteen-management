import styled from "styled-components";
import FlexContainer from "../../ui/FlexContainer";
import SearchBox from "../../ui/SearchBox";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1.2rem;

  & > :first-child {
    align-self: flex-start;
  }
`;

function InventoryTableOperations() {
  return (
    <Layout>
      <Filter
        filterField="category"
        options={[
          { value: "all", label: "Tất cả" },
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
    </Layout>
  );
}

export default InventoryTableOperations;

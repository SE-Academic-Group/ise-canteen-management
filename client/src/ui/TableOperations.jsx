import styled from "styled-components";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : "flex-end")};
  gap: 1.6rem;
`;

export default TableOperations;

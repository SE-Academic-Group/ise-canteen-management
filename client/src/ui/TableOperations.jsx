import styled from "styled-components";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  ${(props) => props.between && `justify-content: space-between;`}
  ${(props) => props.end && `justify-content: flex-end;`}
`;

export default TableOperations;

import styled from "styled-components";

const Styled = styled.h3`
  color: var(--color-blue-700);
  font-size: 1.6rem;
  font-weight: 500;
  background-color: var(--color-blue-100);
  padding: 1.6rem;
  border-radius: 8px;
`;

function Empty({ resourceName, description }) {
  return (
    <Styled>
      {description ? description : `Không thể tìm thấy ${resourceName} nào.`}
    </Styled>
  );
}

export default Empty;

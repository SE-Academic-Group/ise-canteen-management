import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  height: 100svh;

  ${(props) => props.vertical && `grid-template-columns: 1fr;`}
`;

export default StyledAppLayout;

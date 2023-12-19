import styled from "styled-components";

const Container = styled.div`
  max-width: var(--main-width, 120rem);
  margin: 0 auto;
  padding: 4.8rem 1.6rem 6.4rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  contain: paint;

  ${(props) => props.sm && `--main-width: var(--main-width-sm, 120rem);`}
`;

export default Container;

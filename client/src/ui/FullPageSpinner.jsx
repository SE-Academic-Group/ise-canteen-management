import styled from "styled-components";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  height: 100svh;
  background-color: var(--color-grey-50);
  display: grid;
  place-content: center;
`;

function FullPageSpinner() {
  return (
    <FullPage>
      <Spinner />
    </FullPage>
  );
}

export default FullPageSpinner;

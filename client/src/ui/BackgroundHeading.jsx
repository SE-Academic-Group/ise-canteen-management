import styled from "styled-components";
import Heading from "./Heading";

const BackgroundHeading = styled(Heading)`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: 8px;
  padding: 1rem;

  ${(props) =>
    props.small &&
    `
    font-size: 2.4rem;
  `}
`;

export default BackgroundHeading;

import styled from "styled-components";
import { getErrorMessage } from "../utils/helpers";

const Styled = styled.h3`
  color: var(--color-red-700);
  font-size: 1.6rem;
  font-weight: 500;
  background-color: var(--color-red-100);
  padding: 1.6rem;
  border-radius: 8px;
`;

function ErrorLoading({ error }) {
  const message = getErrorMessage(error);
  return <Styled>{message}</Styled>;
}

export default ErrorLoading;

import styled, { css } from "styled-components";

const FormLayout = styled.main`
  --_max-width: 48rem;

  ${(props) =>
    props.size === "sm" &&
    css`
      --_max-width: 32rem;
    `}

  ${(props) =>
    props.size === "md" &&
    css`
      --_max-width: 48rem;
    `}

  ${(props) =>
    props.size === "lg" &&
    css`
      --_max-width: 64rem;
    `}

  min-height: 100vh;
  min-height: 100svh;
  display: grid;
  grid-template-columns: min(var(--_max-width, 52rem), 100%);
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
  padding: 4rem 1.2rem;
`;

export default FormLayout;

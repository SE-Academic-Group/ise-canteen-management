import styled from "styled-components";

const Confirm = styled.div`
  /* width: min(40rem, 96%); */
  width: 40rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

export default Confirm;

import styled from "styled-components"

import { useMoveBack } from "../hooks/useMoveBack"
import Heading from "../ui/Heading"
import Button from "../ui/Button"

const StyledPageNotFound = styled.main`
  height: 100vh;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
  background-color: var(--color-grey-50);
`

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 76rem;
  text-align: center;
`

const NotFound = styled.div`
  font-size: 6.4rem;
  letter-spacing: 1ch;
  color: var(--color-grey-400);
  margin-block: 1rem;
`

function PageNotFound() {
  const moveBack = useMoveBack()

  return (
    <StyledPageNotFound>
      <Box>
        <Heading as="h1">Không thể tìm thấy trang 😢</Heading>
        <NotFound role="presentation">404</NotFound>
        <Button onClick={moveBack} size="large">
          <span role="presentation">&larr; </span>
          Quay lại
        </Button>
      </Box>
    </StyledPageNotFound>
  )
}

export default PageNotFound

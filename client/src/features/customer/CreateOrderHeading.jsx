import styled from "styled-components";
import Heading from "../../ui/Heading";

const StyledHeading = styled(Heading)`
  text-align: center;
  margin-bottom: 2.4rem;
`;

function CreateOrderHeading() {
  return <StyledHeading>Hôm nay ăn gì?</StyledHeading>;
}

export default CreateOrderHeading;

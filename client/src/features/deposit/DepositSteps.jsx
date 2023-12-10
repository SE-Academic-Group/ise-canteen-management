import styled from "styled-components";

import SearchCustomer from "./SearchCustomer";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import DepositAmount from "./DepositAmount";
import DepositResult from "./DepositResult";
import { useState } from "react";

const Container = styled.div`
  padding: 2.4rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 8px;
  background-color: var(--color-grey-0);
`;

const STEPS = [
  <SearchCustomer />,
  <DepositAmount />,
  <DepositAmount />,
  <DepositResult />,
];

function DepositSteps() {
  const [step, setStep] = useState(0);

  function prevStep() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  function nextStep() {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    }
  }

  return (
    <>
      <Container>{STEPS[step]}</Container>
      <ButtonGroup>
        <Button variation="secondary" onClick={prevStep} disabled={step === 0}>
          Quay lại
        </Button>
        {step === STEPS.length - 1 ? (
          <Button variation="primary">Hoàn tất</Button>
        ) : (
          <Button onClick={nextStep}>Tiếp tục</Button>
        )}
      </ButtonGroup>
    </>
  );
}

export default DepositSteps;

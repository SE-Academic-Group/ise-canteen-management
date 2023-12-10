import styled from "styled-components";

import SearchCustomer from "./SearchCustomer";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import DepositAmount from "./DepositAmount";
import DepositForm from "./DepositForm";
import { useState } from "react";
import Modal from "../../ui/Modal";
import ConfirmAction from "../../ui/ConfirmAction";
import { useDeposit } from "./useDeposit";
import Spinner from "../../ui/Spinner";

const Container = styled.div`
  padding: 3.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 8px;
  background-color: var(--color-grey-0);
`;

const HideComponent = styled.div`
  ${({ hidden }) => hidden && "display: none;"}
`;

function DepositSteps() {
  const [step, setStep] = useState(0);
  const [customer, setCustomer] = useState(null);
  const [amount, setAmount] = useState(10000);
  const { isCreating, createDeposit } = useDeposit();
  const length = 3;
  const disabled = (step === 0 && !customer) || (step === 1 && !amount);

  function prevStep() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  function nextStep() {
    if (step < length - 1) {
      setStep(step + 1);
    }
  }

  function handleSelectCustomer(value) {
    if (value._id === customer?._id) {
      setCustomer(null);
      return;
    }

    setCustomer(value);
    nextStep();
  }

  function handleSelectAmount(value, fromInput = false) {
    if (fromInput) {
      setAmount(value);
      return;
    }

    if (value === amount) {
      setAmount(null);
      return;
    }

    setAmount(value);
    nextStep();
  }

  function handleReset() {
    setStep(0);
    setCustomer(null);
    setAmount(10000);
  }

  function handleCreateDeposit() {
    if (customer && amount) {
      createDeposit(
        {
          email: customer.email,
          chargeAmount: amount,
        },
        {
          onSuccess: handleReset,
        }
      );
    }
  }

  return (
    <>
      <Container>
        <HideComponent hidden={step !== 0}>
          <SearchCustomer
            handleSelectCustomer={handleSelectCustomer}
            currentCustomer={customer}
          />
        </HideComponent>

        <HideComponent hidden={step !== 1}>
          <DepositAmount
            currentAmount={amount}
            handleSelectAmount={handleSelectAmount}
          />
        </HideComponent>

        <HideComponent hidden={step !== 2}>
          <DepositForm customer={customer} amount={amount} />
        </HideComponent>

        <HideComponent hidden={!isCreating}>
          <Spinner />
        </HideComponent>
      </Container>
      <ButtonGroup>
        <Button variation="secondary" onClick={prevStep} disabled={step === 0}>
          Quay lại
        </Button>
        <Button
          variation="danger"
          onClick={handleReset}
          disabled={isCreating || step === 0}
        >
          Làm lại
        </Button>
        {step === length - 1 ? (
          <Modal>
            <Modal.Open>
              <Button variation="primary" disabled={isCreating}>
                Hoàn tất
              </Button>
            </Modal.Open>

            <Modal.Window>
              <ConfirmAction
                title="Xác nhận nạp tiền"
                onConfirm={handleCreateDeposit}
              />
            </Modal.Window>
          </Modal>
        ) : (
          <Button onClick={nextStep} disabled={disabled}>
            Tiếp tục
          </Button>
        )}
      </ButtonGroup>
    </>
  );
}

export default DepositSteps;

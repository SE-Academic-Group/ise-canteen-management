import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Input from "../../ui/Input";

import { formatVietnameseCurrency } from "../../utils/helpers";

const Container = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 4rem;
  }
`;

const Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.6rem;
`;

const AmountButton = styled.button`
  appearance: none;
  background-color: transparent;
  border: unset;
  font-size: 3.2rem;
  padding: 0.8rem 1.6rem;
  border: 2px dashed var(--color-grey-300);
  border-radius: 8px;
  font-weight: 500;

  &:hover {
    background-color: var(--color-grey-100);
  }

  &.active {
    background-color: var(--color-brand-200);
    color: var(--color-brand-500);
  }
`;

const StepHeading = styled(Heading)`
  margin-bottom: 2rem;
  text-align: center;
`;

const StepFormRow = styled(FormRow)`
  border: 1px solid var(--color-grey-300);
  border-radius: 8px;
  padding: 2rem;

  &:last-child {
    padding: 2rem;
  }
`;

const DEPOSIT_QUICK_VALUES = [
  10000, 15000, 20000, 25000, 30000, 50000, 100000, 200000, 500000,
];

function DepositAmount({ currentAmount, handleSelectAmount }) {
  const { register, formState, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      amount: currentAmount / 1000,
    },
  });

  function isNumberKey(evt) {
    const charCode = evt.which ? evt.which : evt.keyCode;

    if (evt.target.value.length === 0 && charCode === 48) {
      evt.preventDefault();
      return;
    }

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      evt.preventDefault();
    }
  }

  // Sync currentAmount with input value
  useEffect(() => {
    setValue("amount", currentAmount / 1000);
  }, [currentAmount, setValue]);

  return (
    <Container>
      <StepHeading as="h2">Chọn mệnh giá nạp</StepHeading>
      <Layout>
        {DEPOSIT_QUICK_VALUES.map((value) => (
          <AmountButton
            key={value}
            className={currentAmount === value ? "active" : "s"}
            onClick={() => handleSelectAmount(value)}
          >
            {formatVietnameseCurrency(value)}
          </AmountButton>
        ))}
      </Layout>
      <StepFormRow
        label="Mệnh giá khác (hàng nghìn)"
        error={formState.errors?.amount?.message}
      >
        <Input
          type="number"
          id="amount"
          step={1}
          min={10}
          {...register("amount", {
            required: "Vui lòng nhập số tiền nạp",
            min: {
              value: 10,
              message: "Số tiền nạp tối thiểu là 10.000đ",
            },
          })}
          onChange={(e) => {
            handleSelectAmount(e.target.valueAsNumber * 1000, true);
            setValue("amount", e.target.valueAsNumber, {
              shouldValidate: true,
            });
          }}
          onKeyPress={(e) => isNumberKey(e)}
        />
      </StepFormRow>
    </Container>
  );
}

export default DepositAmount;

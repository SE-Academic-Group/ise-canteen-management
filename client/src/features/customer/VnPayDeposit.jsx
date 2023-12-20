import { useForm } from "react-hook-form";
import { useVnPayDeposit } from "./useVnPayDeposit";

import FormRowVertical from "../../ui/FormRowVertical";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import { FORM_RULES } from "../../constants/form";

function VnPayDeposit() {
  const { isCreating, createDeposit } = useVnPayDeposit();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      chargeAmount: 10000,
    },
  });

  function onSubmit(data) {
    function onSuccess(data) {
      const redirectUrl = data.data;
      window.location.href = redirectUrl;
    }

    const isConfirmed = window.confirm(
      `Bạn có chắc muốn nạp ${data.chargeAmount}đ vào tài khoản?`
    );

    if (isConfirmed) {
      createDeposit(data, { onSuccess });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical
        label="Số tiền cần nạp"
        error={errors?.chargeAmount?.message}
      >
        <Input
          type="number"
          disabled={isCreating}
          min={10000}
          step={1000}
          {...register("chargeAmount", FORM_RULES.PRICE)}
        />
      </FormRowVertical>

      <FormRow>
        <Button disabled={isCreating} type="reset" variation="secondary">
          Hủy
        </Button>
        <Button disabled={isCreating}>Nạp tiền</Button>
      </FormRow>
    </Form>
  );
}

export default VnPayDeposit;

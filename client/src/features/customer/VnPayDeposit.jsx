import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import { useVnPayDeposit } from "./useVnPayDeposit";

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
          min="10000"
          {...register("chargeAmount", {
            required: "Vui lòng nhập số tiền cần nạp",
            min: {
              value: 10000,
              message: "Số tiền tối thiểu là 10.000đ",
            },
            valueAsNumber: true,
          })}
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

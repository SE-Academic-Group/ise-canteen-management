import { useForm } from "react-hook-form";
import { useAddProductToTodayMenu } from "./useAddProductToMenu";

import FormHeading from "../../ui/FormHeading";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import AddProductDataBox from "./AddProductDataBox";

import { FORM_RULES } from "../../constants/form";

function AddProductToTodayMenuForm({
  productToAdd = {},
  onCloseModal = () => {},
}) {
  const { isAdding, addProductToTodayMenu } = useAddProductToTodayMenu();
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });
  const { _id: productId } = productToAdd;

  function onSubmit(data) {
    function onSuccess(data) {
      reset();
      onCloseModal();
    }

    data.productId = productId;
    addProductToTodayMenu(data, { onSuccess });
  }

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormHeading as="h2">Thêm sản phẩm vào thực đơn hôm nay</FormHeading>

      <AddProductDataBox product={productToAdd} />

      <FormRow
        label="Số lượng ban đầu"
        error={formState.errors.quantity?.message}
      >
        <Input
          id="quantity"
          type="number"
          step={1}
          min={0}
          {...register("quantity", FORM_RULES.AMOUNT)}
          disabled={isAdding}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isAdding}
          onClick={onCloseModal}
        >
          Hủy
        </Button>
        <Button disabled={isAdding}>Thêm sản phẩm</Button>
      </FormRow>
    </Form>
  );
}

export default AddProductToTodayMenuForm;

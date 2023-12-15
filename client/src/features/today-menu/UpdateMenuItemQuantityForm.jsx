import { useForm } from "react-hook-form";
import { useUpdateTodayMenuItem } from "./useUpdateTodayMenuItem";

import FormHeading from "../../ui/FormHeading";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import AddProductDataBox from "../products/AddProductDataBox";

import { FORM_RULES } from "../../constants/form";
import toast from "react-hot-toast";

function UpdateMenuItemQuantityForm({
  productToUpdate = {},
  onCloseModal = () => {},
}) {
  const { _id: itemId, totalQuantity, quantity } = productToUpdate;
  const { isUpdating, updateTodayMenuItem } = useUpdateTodayMenuItem();
  const { register, formState, handleSubmit, reset } = useForm({
    defaultValues: {
      quantity,
    },
  });
  const soldQuantity = totalQuantity - quantity;

  function onSubmit(data) {
    function onSuccess(data) {
      reset();
      onCloseModal();
    }

    const { quantity: newQuantity } = data;

    if (newQuantity < quantity) {
      toast.error(
        `Số lượng mới phải lớn hơn hoặc bằng ${soldQuantity} (số lượng đã bán)`
      );
      return;
    }

    updateTodayMenuItem({ newItemData: data, id: itemId }, { onSuccess });
  }

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormHeading as="h2">Thay đổi số lượng sản phẩm</FormHeading>

      <AddProductDataBox product={productToUpdate} />

      <FormRow label="Tổng số lượng">
        <Input disabled value={totalQuantity} />
      </FormRow>
      <FormRow label="Số lượng đã bán">
        <Input disabled value={soldQuantity} />
      </FormRow>
      <FormRow label="Số lượng còn lại">
        <Input disabled value={quantity} />
      </FormRow>

      <FormRow label="Số lượng mới" error={formState.errors.quantity?.message}>
        <Input
          id="quantity"
          type="number"
          step={1}
          min={0}
          {...register("quantity", FORM_RULES.AMOUNT)}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isUpdating}
          onClick={onCloseModal}
        >
          Hủy
        </Button>
        <Button disabled={isUpdating}>Lưu thay đổi</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateMenuItemQuantityForm;

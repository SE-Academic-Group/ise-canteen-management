import { useForm } from "react-hook-form";
import { useImportInventoryItem } from "./useImportInventoryItem";

import FormHeading from "../../ui/FormHeading";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import InventoryItemDataBox from "./InventoryItemDataBox";

import { FORM_RULES } from "../../constants/form";

function ImportInventoryItemForm({
  itemToImport = {},
  onCloseModal = () => {},
}) {
  const { isImporting, importInventoryItem } = useImportInventoryItem();
  const { register, formState, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      quantity: 0,
    },
  });
  const { _id: inventoryItemId } = itemToImport;

  function onSubmit(data) {
    const { quantity } = data;
    const importData = [{ inventoryItemId, quantity }];

    function onSuccess(data) {
      reset();
      onCloseModal();
    }

    importInventoryItem(importData, { onSuccess });
  }

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormHeading as="h2">Nhập hàng</FormHeading>

      <InventoryItemDataBox
        item={itemToImport}
        importNumber={watch("quantity")}
      />

      <FormRow label="Số lượng nhập" error={formState.errors.quantity?.message}>
        <Input
          type="number"
          step={1}
          min={0}
          {...register("quantity", FORM_RULES.AMOUNT)}
          disabled={isImporting}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isImporting}
          onClick={onCloseModal}
        >
          Hủy
        </Button>
        <Button disabled={isImporting}>Lưu thông tin nhập</Button>
      </FormRow>
    </Form>
  );
}

export default ImportInventoryItemForm;

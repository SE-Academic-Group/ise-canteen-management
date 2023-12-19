import { useForm } from "react-hook-form";
import { useExportInventoryItem } from "./useExportInventoryItem";

import FormHeading from "../../ui/FormHeading";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import InventoryItemDataBox from "./InventoryItemDataBox";

import { FORM_RULES } from "../../constants/form";

function ExportInventoryItemForm({
  itemToExport = {},
  onCloseModal = () => {},
}) {
  const { isExporting, exportInventoryItem } = useExportInventoryItem();
  const { register, formState, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      quantity: 0,
    },
  });
  const { _id: inventoryItemId, stockAmount } = itemToExport;

  function onSubmit(data) {
    const { quantity } = data;
    const exportData = [{ inventoryItemId, quantity }];

    function onSuccess(data) {
      reset();
      onCloseModal();
    }

    exportInventoryItem(exportData, { onSuccess });
  }

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormHeading as="h2">Xuất hàng</FormHeading>

      <InventoryItemDataBox
        item={itemToExport}
        importNumber={watch("quantity")}
        isExport
      />

      <FormRow label="Số lượng xuất" error={formState.errors.quantity?.message}>
        <Input
          type="number"
          step={1}
          min={1}
          max={stockAmount}
          {...register("quantity", {
            ...FORM_RULES.AMOUNT,
            max: {
              value: stockAmount,
              message: `Số lượng xuất không được vượt quá ${stockAmount}`,
            },
            valueAsNumber: true,
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isExporting}
          onClick={onCloseModal}
        >
          Hủy
        </Button>
        <Button disabled={isExporting}>Lưu thông tin xuất</Button>
      </FormRow>
    </Form>
  );
}

export default ExportInventoryItemForm;

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
      exportQuantity: 0,
    },
  });
  const { _id: inventoryItemId, stockAmount } = itemToExport;

  function onSubmit(data) {
    const { exportQuantity } = data;
    const exportData = [{ inventoryItemId, exportQuantity }];

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
        importNumber={watch("exportQuantity")}
        isExport
      />

      <FormRow
        label="Số lượng xuất"
        error={formState.errors.exportQuantity?.message}
      >
        <Input
          type="number"
          step={1}
          min={0}
          max={stockAmount}
          {...register("exportQuantity", {
            ...FORM_RULES.exportQuantity,
            max: stockAmount,
          })}
          disabled={isExporting}
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

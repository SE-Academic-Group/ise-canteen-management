import { useForm } from "react-hook-form";
import { useEditInventoryItem } from "./useEditInventoryItem";

import FormHeading from "../../ui/FormHeading";
import TextArea from "../../ui/TextArea";
import FormRow from "../../ui/FormRow";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

import { FORM_RULES } from "../../constants/form";
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "../../constants/options";

function EditInventoryItemForm({ itemToEdit = {}, onCloseModal = () => {} }) {
  const { isEditing, editInventoryItem } = useEditInventoryItem();
  const { _id: editId, ...editValues } = itemToEdit;

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      name: editValues.name,
      price: editValues.price,
      stockAmount: editValues.stockAmount,
      category: editValues.category,
      unit: editValues.unit,
      description: editValues.description,
    },
  });
  const { errors } = formState;

  function onSubmit(data) {
    function onSuccess(data) {
      reset();
      onCloseModal();
    }

    editInventoryItem({ newItemData: data, id: editId }, { onSuccess });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormHeading as="h2">Cập nhật thông tin kho liệu</FormHeading>

      <FormRow label="Tên vật liệu" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          autoComplete="name"
          disabled={isEditing}
          {...register("name", FORM_RULES.PRODUCT_NAME)}
        />
      </FormRow>
      <FormRow label={"Giá / Đơn vị"} error={errors.price?.message}>
        <Input
          type="number"
          step={1000}
          min={1000}
          disabled={isEditing}
          id="price"
          {...register("price", FORM_RULES.PRICE)}
        />
      </FormRow>
      <FormRow label={"Số lượng ban đầu"} error={errors.stockAmount?.message}>
        <Input
          type="number"
          step={1}
          min={0}
          disabled={isEditing}
          id="stockAmount"
          {...register("stockAmount", FORM_RULES.STOCK_AMOUNT)}
        />
      </FormRow>
      <FormRow label={"Phân loại"} error={errors.category?.message}>
        <Select
          options={CATEGORY_OPTIONS}
          disabled={isEditing}
          id="category"
          {...register("category", FORM_RULES.REQUIRED("phân loại"))}
        />
      </FormRow>
      <FormRow label={"Đơn vị"} error={errors.unit?.message}>
        <Select
          options={UNIT_OPTIONS}
          disabled={isEditing}
          id="unit"
          {...register("unit", FORM_RULES.REQUIRED("đơn vị"))}
        />
      </FormRow>
      <FormRow label={"Mô tả"} error={errors.description?.message}>
        <TextArea
          disabled={isEditing}
          id="description"
          {...register("description", FORM_RULES.DESCRIPTION)}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Hủy
        </Button>
        <Button disabled={isEditing}>Lưu thay đổi</Button>
      </FormRow>
    </Form>
  );
}

export default EditInventoryItemForm;

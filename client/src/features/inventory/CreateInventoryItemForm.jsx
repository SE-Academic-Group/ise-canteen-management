import { useForm } from "react-hook-form";
import { useCreateInventoryItem } from "./useCreateInventoryItem";

import FormHeading from "../../ui/FormHeading";
import TextArea from "../../ui/TextArea";
import FormRow from "../../ui/FormRow";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

import { FORM_RULES } from "../../constants/form";
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "../../constants/options";

function CreateInventoryItemForm({ onCloseModal = () => {} }) {
  const { isCreating, createInventoryItem } = useCreateInventoryItem();

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      name: "",
      price: 1000,
      stockAmount: 0,
      category: CATEGORY_OPTIONS.at(0).value,
      unit: UNIT_OPTIONS.at(0).value,
      description: "",
    },
  });
  const { errors } = formState;

  function onSubmit(data) {
    function onSuccess(data) {
      reset();
      onCloseModal();
    }

    createInventoryItem(data, { onSuccess });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormHeading as="h2">Thêm mới thông tin kho liệu</FormHeading>

      <FormRow label="Tên vật liệu" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          autoComplete="name"
          disabled={isCreating}
          {...register("name", FORM_RULES.PRODUCT_NAME)}
        />
      </FormRow>
      <FormRow label={"Giá / Đơn vị"} error={errors.price?.message}>
        <Input
          type="number"
          step={1000}
          min={1000}
          disabled={isCreating}
          id="price"
          {...register("price", FORM_RULES.PRICE)}
        />
      </FormRow>
      <FormRow label={"Số lượng ban đầu"} error={errors.stockAmount?.message}>
        <Input
          type="number"
          step={1}
          min={0}
          disabled={isCreating}
          id="stockAmount"
          {...register("stockAmount", FORM_RULES.STOCK_AMOUNT)}
        />
      </FormRow>
      <FormRow label={"Phân loại"} error={errors.category?.message}>
        <Select
          options={CATEGORY_OPTIONS}
          disabled={isCreating}
          id="category"
          {...register("category", FORM_RULES.REQUIRED("phân loại"))}
        />
      </FormRow>
      <FormRow label={"Đơn vị"} error={errors.unit?.message}>
        <Select
          options={UNIT_OPTIONS}
          disabled={isCreating}
          id="unit"
          {...register("unit", FORM_RULES.REQUIRED("đơn vị"))}
        />
      </FormRow>
      <FormRow label={"Mô tả"} error={errors.description?.message}>
        <TextArea
          disabled={isCreating}
          id="description"
          {...register("description", FORM_RULES.DESCRIPTION)}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Hủy
        </Button>
        <Button disabled={isCreating}>Tạo thông tin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateInventoryItemForm;

import { useId } from "react";
import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import TextArea from "../../ui/TextArea";

import { FORM_RULES, PRODUCT_CATEGORIES } from "../../utils/constants";
import { categoryToVietnamese } from "../../utils/translator";
import { useCreateProduct } from "./useCreateProduct";
import { useEditProduct } from "./useEditProduct";

function CreateProductForm({ productToEdit = {}, onCloseModal = () => {} }) {
  const id = useId();
  const { isCreating, createProduct } = useCreateProduct();
  const { isEditing, editProduct } = useEditProduct();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = productToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession
      ? editValues
      : {
          image:
            "https://loremflickr.com/200/128/food?lock=" +
            crypto.getRandomValues(new Uint32Array(1))[0],
        },
  });
  const { errors } = formState;

  function onSubmit(data) {
    function onSuccess(data) {
      reset();
      onCloseModal();
    }

    if (isEditSession) {
      editProduct({ newProductData: data, id: editId }, { onSuccess });
    } else {
      createProduct(data, { onSuccess });
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label={"Tên sản phẩm"} error={errors.name?.message}>
        <Input
          type="text"
          disabled={isWorking}
          id={"name" + id}
          {...register("name", FORM_RULES.PRODUCT_NAME)}
        />
      </FormRow>

      <FormRow label={"Giá tiền"} error={errors.price?.message}>
        <Input
          type="number"
          step={1000}
          disabled={isWorking}
          id={"price" + id}
          {...register("price", FORM_RULES.PRICE)}
        />
      </FormRow>

      <FormRow label={"Mô tả"} error={errors.description?.message}>
        <TextArea
          disabled={isWorking}
          id={"description" + id}
          {...register("description", FORM_RULES.DESCRIPTION)}
        />
      </FormRow>

      <FormRow label={"Phân loại"} error={errors.category?.message}>
        <Select
          options={PRODUCT_CATEGORIES.map((category) => ({
            value: category,
            label: categoryToVietnamese(category),
          }))}
          disabled={isWorking}
          id={"category" + id}
          {...register("category", FORM_RULES.REQUIRED("phân loại"))}
        />
      </FormRow>

      {/* TODO: Upload image */}
      {/* TODO: Preview current image if this is a edit session */}
      <FormRow label="Ảnh sản phẩm">
        <FileInput id="avatar" accept="image/*" />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Hủy
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Lưu thay đổi" : "Tạo sản phẩm"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateProductForm;

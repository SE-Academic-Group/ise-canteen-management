import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormHeading from "../../ui/FormHeading";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import TextArea from "../../ui/TextArea";

import { FORM_RULES, PRODUCT_CATEGORIES } from "../../utils/constants";
import { TRANSLATOR_KEYS, translator } from "../../utils/translator";
import { useEditProduct } from "./useEditProduct";
import { useState } from "react";

function EditProductForm({ productToEdit = {}, onCloseModal = () => {} }) {
  const [image, setImage] = useState(null);
  const { isEditing, editProduct } = useEditProduct();

  const { _id: editId, ...editValues } = productToEdit;

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: editValues,
  });
  const { errors } = formState;

  function onSubmit(data) {
    function onSuccess(data) {
      reset();
      onCloseModal();
    }

    editProduct(
      { newProductData: { ...data, image }, id: editId },
      { onSuccess }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormHeading as="h2">Cập nhật thông tin sản phẩm</FormHeading>

      <FormRow label={"Tên sản phẩm"} error={errors.name?.message}>
        <Input
          type="text"
          disabled={isEditing}
          id="name"
          {...register("name", FORM_RULES.PRODUCT_NAME)}
        />
      </FormRow>

      <FormRow label={"Giá tiền"} error={errors.price?.message}>
        <Input
          type="number"
          step={1000}
          disabled={isEditing}
          id="price"
          {...register("price", FORM_RULES.PRICE)}
        />
      </FormRow>

      <FormRow label={"Mô tả"} error={errors.description?.message}>
        <TextArea
          disabled={isEditing}
          id="description"
          {...register("description", FORM_RULES.DESCRIPTION)}
        />
      </FormRow>

      <FormRow label={"Phân loại"} error={errors.category?.message}>
        <Select
          options={PRODUCT_CATEGORIES.map((category) => ({
            value: category,
            label: translator(TRANSLATOR_KEYS.CATEGORY, category),
          }))}
          disabled={isEditing}
          id="category"
          {...register("category", FORM_RULES.REQUIRED("phân loại"))}
        />
      </FormRow>

      <FormRow label="Ảnh sản phẩm">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isEditing}
          onChange={(e) => setImage(e.target.files[0])}
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

export default EditProductForm;

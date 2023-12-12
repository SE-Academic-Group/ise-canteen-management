import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEditProduct } from "./useEditProduct";

import FormHeading from "../../ui/FormHeading";
import FileInput from "../../ui/FileInput";
import TextArea from "../../ui/TextArea";
import FormRow from "../../ui/FormRow";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

import { CATEGORY_OPTIONS } from "../../constants/options";
import { FORM_RULES } from "../../constants/form";

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
          options={CATEGORY_OPTIONS}
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

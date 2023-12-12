import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateProduct } from "./useCreateProduct";

import FormHeading from "../../ui/FormHeading";
import FileInput from "../../ui/FileInput";
import TextArea from "../../ui/TextArea";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Select from "../../ui/Select";
import Input from "../../ui/Input";
import Form from "../../ui/Form";

import { FORM_RULES } from "../../constants/form";
import { CATEGORY_OPTIONS } from "../../constants/options";

function CreateProductForm({ onCloseModal = () => {} }) {
  const [image, setImage] = useState(null);
  const { isCreating, createProduct } = useCreateProduct();

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      category: "food",
    },
  });
  const { errors } = formState;

  function onSubmit(data) {
    function onSuccess(data) {
      reset();
      onCloseModal();
    }

    createProduct({ ...data, image }, { onSuccess });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="modal">
      <FormHeading as="h2">Thêm mới sản phẩm</FormHeading>

      <FormRow label={"Tên sản phẩm"} error={errors.name?.message}>
        <Input
          type="text"
          disabled={isCreating}
          id="name"
          {...register("name", FORM_RULES.PRODUCT_NAME)}
        />
      </FormRow>
      <FormRow label={"Giá tiền"} error={errors.price?.message}>
        <Input
          type="number"
          step={1000}
          disabled={isCreating}
          id="price"
          {...register("price", FORM_RULES.PRICE)}
        />
      </FormRow>
      <FormRow label={"Mô tả"} error={errors.description?.message}>
        <TextArea
          disabled={isCreating}
          id="description"
          {...register("description", FORM_RULES.DESCRIPTION)}
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
      <FormRow label="Ảnh sản phẩm">
        <FileInput
          disabled={isCreating}
          id="avatar"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Hủy
        </Button>
        <Button disabled={isCreating}>Tạo sản phẩm</Button>
      </FormRow>
    </Form>
  );
}

export default CreateProductForm;

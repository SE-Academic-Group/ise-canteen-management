import { useId } from "react";
import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import TextArea from "../../ui/TextArea";

import { PRODUCT_CATEGORIES, REGEX_PATTERNS } from "../../utils/constants";
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
          {...register("name", {
            required: "Bạn cần nhập tên sản phẩm",
            pattern: {
              value: REGEX_PATTERNS.VIETNAMESE_NAME,
              message: "Tên sản phẩm không hợp lệ",
            },
            minLength: {
              value: 3,
              message: "Tên sản phẩm phải có ít nhất 3 ký tự",
            },
            maxLength: {
              value: 50,
              message: "Tên sản phẩm không được vượt quá 50 ký tự",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Giá tiền"} error={errors.price?.message}>
        <Input
          type="number"
          step={1000}
          disabled={isWorking}
          id={"price" + id}
          {...register("price", {
            valueAsNumber: true,
            required: "Giá tiền không được để trống",
            min: {
              value: 1000,
              message: "Giá tiền phải lớn hơn 1000",
            },
            max: {
              value: 1000000000,
              message: "Giá tiền phải nhỏ hơn 1 tỷ",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Mô tả"} error={errors.description?.message}>
        <TextArea
          disabled={isWorking}
          id={"description" + id}
          {...register("description", {
            required: "Bạn cần nhập mô tả sản phẩm",
            minLength: {
              value: 10,
              message: "Mô tả sản phẩm phải có ít nhất 10 ký tự",
            },
            maxLength: {
              value: 200,
              message: "Mô tả sản phẩm không được vượt quá 200 ký tự",
            },
          })}
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
          {...register("category", {
            required: "Bạn cần chọn danh mục",
          })}
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

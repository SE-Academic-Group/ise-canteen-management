import { useForm } from "react-hook-form";
import { useCreateProductReview } from "../products/useCreateProductReview";
import { useUser } from "../authentication/useUser";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import TextArea from "../../ui/TextArea";

function CreateProductReviewForm({ productId }) {
  const { isCreating, createProductReview } = useCreateProductReview();
  const { user, isLoading } = useUser();
  const isWorking = isCreating || isLoading;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      rating: 5,
      review: "",
    },
  });

  function onSubmit(data) {
    data.userId = user._id;
    data.productId = productId;

    if (isWorking) return;

    createProductReview(data, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>Hãy để lại đánh giá của bạn</h3>
      <FormRowVertical
        label="Bạn thấy đáng giá mấy sao?"
        error={errors?.rating?.message}
      >
        <Input
          type="number"
          min={1}
          max={5}
          disabled={isWorking}
          {...register("rating", {
            required: "Bạn chưa đánh giá sao cho sản phẩm này",
            min: {
              value: 1,
              message: "Số sao tối thiểu là 1",
            },
            max: {
              value: 5,
              message: "Số sao tối đa là 5",
            },
            valueAsNumber: true,
          })}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Bạn đánh giá sản phẩm như thế nào?"
        error={errors?.review?.message}
      >
        <TextArea
          disabled={isWorking}
          {...register("review", {
            required: "Bạn chưa đánh giá sản phẩm này",
            minLength: {
              value: 10,
              message: "Đánh giá tối thiểu 10 kí tự",
            },
          })}
        />
      </FormRowVertical>

      <FormRow>
        <Button disabled={isWorking}>Đánh giá</Button>
      </FormRow>
    </Form>
  );
}

export default CreateProductReviewForm;

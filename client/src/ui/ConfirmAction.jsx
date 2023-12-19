import Button from "./Button";
import Heading from "./Heading";
import Confirm from "./Confirm";

function ConfirmAction({
  disabled,
  title,
  description,
  closeOnConfirm = true,
  danger = false,
  onConfirm = () => {},
  onCloseModal = () => {},
}) {
  return (
    <Confirm>
      <Heading as="h3">{title ?? "Xác nhận hành động"}</Heading>
      <p>
        {description ?? `Bạn có chắc chắn muốn thực hiện hành động này không?`}
      </p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Hủy
        </Button>
        <Button
          disabled={disabled}
          variation={danger ? "danger" : "primary"}
          onClick={() => {
            onConfirm();
            closeOnConfirm && onCloseModal();
          }}
        >
          Xác nhận
        </Button>
      </div>
    </Confirm>
  );
}

export default ConfirmAction;

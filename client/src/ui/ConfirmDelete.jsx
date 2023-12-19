import Button from "./Button";
import Heading from "./Heading";
import Confirm from "./Confirm";

function ConfirmDelete({
  resourceName,
  disabled,
  title,
  description,
  closeOnConfirm = true,
  onConfirm = () => {},
  onCloseModal = () => {},
}) {
  return (
    <Confirm>
      <Heading as="h3">{title ?? `Xóa ${resourceName}`}</Heading>
      <p>
        {description ??
          ` Bạn có chắc chắn muốn xóa ${resourceName} này không? (Không thể hoàn
        tác)`}
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
          variation="danger"
          disabled={disabled}
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

export default ConfirmDelete;

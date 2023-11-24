import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

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
    <StyledConfirmDelete>
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
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;

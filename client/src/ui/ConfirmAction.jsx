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

function ConfirmAction({
  disabled,
  title,
  description,
  closeOnConfirm = true,
  onConfirm = () => {},
  onCloseModal = () => {},
}) {
  return (
    <StyledConfirmDelete>
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

export default ConfirmAction;

import styled from "styled-components";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const MockAvatar = styled.div`
  display: grid;
  place-items: center;
  font-weight: medium;
  font-size: 1.8rem;
  color: white;
  width: 3.6rem;
  aspect-ratio: 1;
  background-color: var(--color-brand-500);
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

function UserAvatar() {
  const { fullName } = {
    fullName: "admin01",
    avatar: "https://i.pravatar.cc/300",
  };

  return (
    <StyledUserAvatar>
      {/* <Avatar
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      /> */}
      <MockAvatar>{fullName.at(0)?.toLocaleUpperCase()}</MockAvatar>
      <span>@{fullName}</span>
    </StyledUserAvatar>
  );
}

export default UserAvatar;

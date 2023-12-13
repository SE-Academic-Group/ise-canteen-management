import styled from "styled-components";
import { useUser } from "./useUser";

import SpinnerMini from "../../ui/SpinnerMini";
import Tag from "../../ui/Tag";
import { translator } from "../../utils/translator";
import { getImageUrl, getPlaceholderImageUrl } from "../../utils/helpers";

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

function UserAvatar() {
  const { user, isLoading } = useUser();

  if (isLoading) return <SpinnerMini />;

  const { name, role, image } = user;
  const imageUrl = image ? getImageUrl(image) : getPlaceholderImageUrl(name);

  return (
    <StyledUserAvatar>
      <Avatar src={imageUrl} alt={`Avatar of ${name}`} />
      <span>{name}</span>
      <Tag type="brand">{translator("role", role)}</Tag>
    </StyledUserAvatar>
  );
}

export default UserAvatar;

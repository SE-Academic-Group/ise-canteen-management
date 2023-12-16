import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const { isLoading: isUpdating, mutate: updateUser } = useApiMutation({
    fn: updateCurrentUser,
    key: [QUERY_KEYS.USER],
    successMsg: "Cập nhật thông tin thành công!",
  });

  return { updateUser, isUpdating };
}

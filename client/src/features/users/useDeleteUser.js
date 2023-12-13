import { QUERY_KEYS } from "../../constants/keys";
import { useApiMutation } from "../../hooks/useApiMutation";
import { deleteUser as deleteUserApi } from "../../services/apiUsers";

export function useDeleteUser() {
  const { isLoading: isDeleting, mutate: deleteUser } = useApiMutation({
    fn: deleteUserApi,
    key: [QUERY_KEYS.USERS],
    successMsg: "Xóa người dùng thành công!",
  });

  return { isDeleting, deleteUser };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteUser as deleteUserApi } from "../../services/apiUsers";
import { QUERY_KEYS } from "../../utils/constants";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteUser } = useMutation({
    mutationFn: deleteUserApi,
    onSuccess: () => {
      toast.success("Xóa người dùng thành công!");

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.USERS],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteUser };
}

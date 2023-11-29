import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createEditUser } from "../../services/apiUsers";
import { QUERY_KEYS } from "../../utils/constants";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutate: createUser, isLoading: isCreating } = useMutation({
    mutationFn: createEditUser,
    onSuccess: () => {
      toast.success("Tài khoản người dùng đã được tạo thành công!");

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createUser };
}

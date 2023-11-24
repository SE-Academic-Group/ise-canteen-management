import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createEditUser } from "../../services/apiUsers";
import { QUERY_KEYS } from "../../utils/constants";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutate: createUser, isLoading: isEditing } = useMutation({
    mutationFn: createEditUser,
    onSuccess: () => {
      toast.success("User successfully created");

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, createUser };
}

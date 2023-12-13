import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../utils/helpers";

/**
 * Custom hook for making API mutations.
 *
 * @param {Object} options - The options for the API mutation.
 * @param {Function} options.fn - The function to be called for the mutation.
 * @param {string} options.key - The key used to invalidate queries after successful mutation.
 * @param {string} options.successMsg - The success message to be displayed.
 * @param {string} options.errorMsg - The error message to be displayed.
 * @param {Function} options.onSuccess - The callback function to be called after successful mutation.
 * @param {Function} options.onError - The callback function to be called after failed mutation.
 * @returns {Object} - The mutation object.
 */
export function useApiMutation({
  fn,
  key,
  successMsg,
  errorMsg,
  onSuccess = () => {},
  onError = () => {},
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (...data) => {
      toast.dismiss();
      toast.loading("Đang xử lý...");
      return fn(...data);
    },
    onSuccess: (data) => {
      toast.dismiss();
      toast.success(successMsg || "Thành công!");

      if (key) {
        queryClient.invalidateQueries({
          queryKey: key,
        });
      }

      onSuccess(data);
    },
    onError: (err) => {
      toast.dismiss();
      toast.error(errorMsg || getErrorMessage(err));
      onError(err);
    },
  });

  return mutation;
}

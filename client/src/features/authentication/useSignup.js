// import { useMutation } from "@tanstack/react-query";
// import { signup as signupApi } from "../../services/apiAuth";
// import { toast } from "react-hot-toast";
// import { useUser } from "./useUser";
// import { useNavigate } from "react-router-dom";
// import { useQueryClient } from "@tanstack/react-query";

// export function useSignup() {
//   const { storeUser } = useUser();
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const { mutate: signup, isLoading } = useMutation({
//     mutationFn: signupApi,
//     onSuccess: (data) => {
//       toast.success("Đăng ký tài khoản thành công");
//       storeUser(data?.user);
//       queryClient.setQueryData(["user"], data);
//       navigate("/dashboard", { replace: true });
//     },
//     onError: (err) => {
//       toast.error("Có lỗi xảy ra, vui lòng thử lại.");
//     },
//   });

//   return { signup, isLoading };
// }

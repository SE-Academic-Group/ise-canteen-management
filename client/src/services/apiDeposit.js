import axiosClient from "../utils/axios";

export async function createDeposit({ email, chargeAmount }) {
  const url = "/charge-histories";
  const body = {
    email,
    chargeAmount,
  };

  const res = await axiosClient.post(url, body);
  console.log(res);
  return res.data;
}

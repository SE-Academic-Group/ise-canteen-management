import axiosClient from "../utils/axios";

/**
 * Creates a deposit for a user.
 * @param {Object} depositData - The deposit data.
 * @param {string} depositData.email - The email of the user.
 * @param {number} depositData.chargeAmount - The amount to be charged.
 * @returns {Promise<Object>} - A promise that resolves to the deposit data.
 */
export async function createDeposit({ email, chargeAmount }) {
  const url = "/charge-histories";
  const body = {
    email,
    chargeAmount,
  };

  const res = await axiosClient.post(url, body);

  return res.data;
}

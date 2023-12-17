import axiosClient from "../utils/axios";
import { getItemsFactory } from "../utils/apiItemsFactory";

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

/**
 * Retrieves the charge history for a specific user.
 *
 * @param {string} userId - The ID of the user.
 * @param {Object} queryOptions - Additional query options for the API request.
 * @returns {Promise<Array>} - A promise that resolves to an array of charge history items.
 */
export async function getMyChargeHistory(userId, queryOptions = {}) {
  return getItemsFactory(`/users/${userId}/charge-histories`, queryOptions)();
}

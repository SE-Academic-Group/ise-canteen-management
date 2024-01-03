import axiosClient from "../utils/axios";
import { getItemsFactory } from "../utils/apiItemsFactory";

export async function getNumberOfCustomers() {
  const res = await axiosClient.get("/users?role=customer");
  const count = Number(res.headers["x-total-count"]);

  return { data: res.data.data, count };
}

export const getRevenueStat = getItemsFactory("/statistics/revenue");
export const getImportStat = getItemsFactory("/statistics/import");
export const getExportStat = getItemsFactory("/statistics/export,");

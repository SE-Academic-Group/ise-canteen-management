import { useQueryFetch } from "../../hooks/useQueryFetch";
import { getMyChargeHistory } from "../../services/apiDeposit";
import { QUERY_KEYS } from "../../constants/keys";

export function useMyChargeHistory(userId) {
  const { isLoading, error, data } = useQueryFetch({
    fn: () => getMyChargeHistory(userId),
    key: [QUERY_KEYS.CHARGE_HISTORY, userId],
  });

  return { isLoading, error, history: data?.data || [], count: data?.count };
}

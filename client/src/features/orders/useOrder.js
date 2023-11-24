import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getOrder } from "../../services/apiOrder";
import { QUERY_KEYS } from "../../utils/constants";

export function useOrder() {
  const { orderId } = useParams();

  const {
    isLoading,
    data: order,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.ORDER, orderId],
    queryFn: () => getOrder(orderId),
    retry: false,
  });

  return { isLoading, error, order };
}

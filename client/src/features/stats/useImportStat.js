import { QUERY_KEYS } from "../../constants/keys";
import { useQueryFetch } from "../../hooks/useQueryFetch";
import { getImportStat } from "../../services/apiStats";
export function useImportStat() {
  const queryKey = [QUERY_KEYS.IMPORT_STAT];

  const {
    isLoading,
    error,
    data: { data },
  } = useQueryFetch({
    fn: () =>
      getImportStat({
        filters: [{ field: "type", value: "month" }],
      }),
    key: queryKey,
  });

  return { isLoading, error, importStat: data };
}

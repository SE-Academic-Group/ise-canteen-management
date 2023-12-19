import Empty from "./Empty";
import ErrorLoading from "./ErrorLoading";
import Spinner from "./Spinner";

function Progressing({ error, isLoading, count, resourceName, children }) {
  if (error) return <ErrorLoading error={error} />;

  if (isLoading) return <Spinner />;

  if (count !== undefined && count != null && count === 0)
    return <Empty resourceName={resourceName} />;

  return children;
}

export default Progressing;

import ErrorLoading from "../../ui/ErrorLoading";
import Spinner from "../../ui/Spinner";
import { useTodayMenu } from "./useTodayMenu";

function TodayMenuList() {
  const { isLoading, error, menuItems } = useTodayMenu();

  if (error) {
    return <ErrorLoading error={error} />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  console.log(menuItems);

  return <div>TodayMenu</div>;
}

export default TodayMenuList;

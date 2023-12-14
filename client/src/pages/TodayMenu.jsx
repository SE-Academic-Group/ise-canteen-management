import TodayMenuActions from "../features/today-menu/TodayMenuActions";
import TodayMenuFilter from "../features/today-menu/TodayMenuFilter";
import TodayMenuList from "../features/today-menu/TodayMenuList";
import PageHeading from "../ui/PageHeading";

function TodayMenu() {
  return (
    <>
      <PageHeading>Thực đơn hôm nay</PageHeading>
      <TodayMenuFilter />
      <TodayMenuList />
      <TodayMenuActions />
    </>
  );
}

export default TodayMenu;

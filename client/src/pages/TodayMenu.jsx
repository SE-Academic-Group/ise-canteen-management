import TodayMenuList from "../features/today-menu/TodayMenuList";
import PageHeading from "../ui/PageHeading";

function TodayMenu() {
  return (
    <>
      <PageHeading>Thực đơn hôm nay</PageHeading>
      <TodayMenuList />
    </>
  );
}

export default TodayMenu;

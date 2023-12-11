import MenuTable from "../features/menus/MenuTable";
import TodayMenu from "../features/menus/TodayMenu";
import PageHeading from "../ui/PageHeading";

function Menus() {
  return (
    <>
      <PageHeading>Quản lý thực đơn</PageHeading>
      <TodayMenu />
      <MenuTable />
    </>
  );
}

export default Menus;

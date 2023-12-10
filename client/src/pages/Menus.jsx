import MenuTable from "../features/menus/MenuTable";
import PageHeading from "../ui/PageHeading";

function Menus() {
  return (
    <>
      <PageHeading>Quản lý thực đơn</PageHeading>
      <div>today menu</div>
      <MenuTable />
    </>
  );
}

export default Menus;

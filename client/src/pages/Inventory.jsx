import AddInventoryItem from "../features/inventory/AddInventoryItem";
import InventoryItemTable from "../features/inventory/InventoryItemTable";
import InventoryItemTableOperations from "../features/inventory/InventoryItemTableOperations";
import PageHeading from "../ui/PageHeading";

function Inventory() {
  return (
    <>
      <PageHeading>Quản lý kho hàng</PageHeading>
      <InventoryItemTableOperations />
      <InventoryItemTable />
      <AddInventoryItem />
    </>
  );
}

export default Inventory;

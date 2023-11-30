import AddInventoryItem from "../features/inventory/AddInventoryItem";
import InventoryItemTable from "../features/inventory/InventoryItemTable";
import InventoryItemTableOperations from "../features/inventory/InventoryItemTableOperations";
import BackgroundHeading from "../ui/BackgroundHeading";

function Inventory() {
  return (
    <>
      <BackgroundHeading as="h1">Quản lý kho hàng</BackgroundHeading>
      <InventoryItemTableOperations />
      <InventoryItemTable />
      <AddInventoryItem />
    </>
  );
}

export default Inventory;

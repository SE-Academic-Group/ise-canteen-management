import Progressing from "../../ui/Progressing";
import Pagination from "../../ui/Pagination";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import InventoryItemRow from "./InventoryItemRow";

import { useInventoryItems } from "./useInventoryItems";

export default function InventoryTable() {
  const state = useInventoryItems();
  const { count, inventoryItems } = state;

  return (
    <Progressing {...state} resourceName="Sản phẩm">
      <Menus>
        <Table columns="20ch 14ch 1fr 16ch 16ch 3.2rem">
          <Table.Header>
            <div>Tên sản phẩm</div>
            <div>Giá / Đơn vị</div>
            <div>Mô tả</div>
            <div>Phân loại</div>
            <div>Số lượng</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={inventoryItems}
            render={(item) => <InventoryItemRow key={item._id} item={item} />}
          />

          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        </Table>
      </Menus>
    </Progressing>
  );
}

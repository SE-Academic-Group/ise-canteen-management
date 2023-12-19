import Pagination from "../../ui/Pagination";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import MenuRow from "./MenuRow";

import Progressing from "../../ui/Progressing";
import { useMenuHistories } from "./useMenuHistories";

export default function MenuTable() {
  const state = useMenuHistories();
  const { count, menuHistories } = state;

  return (
    <Progressing {...state} resourceName="Lịch sử thay đổi menu">
      <Menus>
        <Table columns="10ch 20ch 1fr 18ch 3.2rem">
          <Table.Header>
            <div>STT</div>
            <div>Ngày </div>
            <div>Tóm tắt</div>
            <div>Doanh thu</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={menuHistories}
            render={(history, i) => (
              <MenuRow key={history._id} history={history} number={i + 1} />
            )}
          />

          <Table.Footer>
            <Pagination count={count} />
          </Table.Footer>
        </Table>
      </Menus>
    </Progressing>
  );
}

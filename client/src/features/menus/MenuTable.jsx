import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import MenuRow from "./MenuRow";

import { useMenuHistories } from "./useMenuHistories";

export default function MenuTable() {
  const { isLoading, count, menuHistories } = useMenuHistories();

  if (isLoading) return <Spinner />;

  if (!count) return <Empty resourceName="thực đơn" />;

  return (
    <Menus>
      <Table columns="100px 20ch 10ch 3fr 12ch 10ch 3.2rem">
        <Table.Header>
          <div>STT</div>
          <div>Ngày </div>
          <div>Tóm tắt</div>
          <div>Doanh thu</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={menuHistories}
          render={(history) => <MenuRow key={history._id} history={history} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

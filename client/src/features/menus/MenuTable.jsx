import ErrorLoading from "../../ui/ErrorLoading";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import MenuRow from "./MenuRow";

import { useMenuHistories } from "./useMenuHistories";

export default function MenuTable() {
  const { isLoading, error, count, menuHistories } = useMenuHistories();

  if (error) return <ErrorLoading error={error} />;

  if (isLoading) return <Spinner />;

  if (!count) return <Empty resourceName="thực đơn" />;

  return (
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
  );
}

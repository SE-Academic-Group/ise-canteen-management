import { HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import {
  calculateRevenue,
  createMenuSummary,
} from "../../services/MenuOperations";
import ButtonIcon from "../../ui/ButtonIcon";
import Table from "../../ui/Table";

function MenuRow({ history, number }) {
  const navigate = useNavigate();
  const { menuDate, menuItems, _id } = history;
  const revenue = calculateRevenue(menuItems);
  const summary = createMenuSummary(menuItems);

  return (
    <Table.Row>
      <Table.Column.Serial>{number}</Table.Column.Serial>
      <Table.Column.Date>{menuDate}</Table.Column.Date>
      <Table.Column.Description>{summary.message}</Table.Column.Description>
      <Table.Column.Amount>{revenue}</Table.Column.Amount>

      <ButtonIcon onClick={() => navigate(`/menus/${_id}`)} raw>
        <span className="sr-only">Xem chi tiết</span>
        <span role="presentation">
          <HiEye />
        </span>
      </ButtonIcon>
    </Table.Row>
  );
}

export default MenuRow;

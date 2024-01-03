import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";

function StatsOperations() {
  return (
    <TableOperations end="true">
      <Filter
        filterField="type"
        options={[
          { value: "today", label: "Hôm nay" },
          { value: "month", label: "Tháng nay" },
          { value: "year", label: "Năm nay" },
        ]}
      />
    </TableOperations>
  );
}

export default StatsOperations;

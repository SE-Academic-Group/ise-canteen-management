import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function DashboardFilter() {
  return (
    <TableOperations end="true">
      <Filter
        filterField="type"
        options={[
          { value: "month", label: "Trong 30 ngày" },
          { value: "year", label: "Trong 12 tháng" },
        ]}
      />
    </TableOperations>
  );
}

export default DashboardFilter;

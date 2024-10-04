import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "approved", label: "Approved" },
        { value: "pending", label: "Pending" },
        { value: "connection_released", label: "Connection Released" },
        { value: "rejected", label: "Rejected" },
      ]}
    />
  );
}

export default DashboardFilter;

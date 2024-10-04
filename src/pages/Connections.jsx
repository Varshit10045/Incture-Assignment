import ConnectionTable from "../features/cabins/ConnectionTable";
import Row from "../ui/Row";
import AddConnection from "../features/cabins/AddConnection";
import CabinTableOperations from "../features/cabins/ConnectionTableOperations";

function Connections() {
  return (
    <>
      <Row type="horizontal">
        <CabinTableOperations />
        {/* Component that contains the filter by date and search logic */}
      </Row>

      <Row>
        {/* component that contains the connection data */}
        <ConnectionTable />
        {/* to add a new connection */}
        <AddConnection />
      </Row>
    </>
  );
}

export default Connections;

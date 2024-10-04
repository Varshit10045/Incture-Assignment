import Spinner from "../../ui/Spinner";
import CabinRow from "./ConnectionRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import { useBookings } from "../bookings/useBookings";

function ConnectionTable() {
  //Created a custom hook for getting the connection data
  const {bookings, isLoading, count, page} = useBookings()

  //If is is still fetching the data we display a spinner component
  if (isLoading) return <Spinner />;

  //If the data is empty we just display a component saying that no data was found
  if (!bookings.length) return <Empty resourceName="connections" />;
  

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>S.No</div>
          <div>Name</div>
          <div>Gender</div>
          <div>District</div>
          <div>ID Number</div>
          <div></div>
        </Table.Header>

        <Table.Body
        
          data={bookings}
          render={(connection) => <CabinRow connection={connection} key={connection.ID} page = {page}/>}
        />
        <Table.Footer>
          {/* records can a huge in number so we are paginating it */}
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default ConnectionTable;

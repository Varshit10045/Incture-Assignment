import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useConnection } from "../cabins/useConnection";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
`;

function DashboardLayout() {
  const { connections, isLoading: isLoading3 } = useConnection();
  if ( isLoading3) return <Spinner />;
  console.log(connections)
  return (
    <StyledDashboardLayout>
      <DurationChart data={connections} />
      <SalesChart bookings={connections}  />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;

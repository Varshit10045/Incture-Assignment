import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  margin-top: 1rem;
  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ bookings }) {
  const { isDarkMode } = useDarkMode();
  const [searchParams, setSearchParams] = useSearchParams();

  const abc = searchParams.get("last") ? searchParams.get("last") : "approved";

  // const allDates = eachDayOfInterval({
  //   start: subDays(new Date(), numDays - 1),
  //   end: new Date(),
  // });
  const data = [{connections: bookings.counts.jan[abc], label: "Jan"}, {connections: bookings.counts.feb[abc], label: "Feb"}, {connections: bookings.counts.march[abc], label: "March"}, {connections: bookings.counts.april[abc], label: "April"}, {connections: bookings.counts.may[abc], label: "May"}, {connections: bookings.counts.june[abc], label: "June"}, {connections: bookings.counts.july[abc], label: "July"}, {connections: bookings.counts.aug[abc], label: "August"}, {connections: bookings.counts.sept[abc], label: "Sept"}, {connections: bookings.counts.oct[abc], label: "Oct"}, {connections: bookings.counts.nov[abc], label: "Nov"},{connections: bookings.counts.dec[abc], label: "Dec"}]
  // const data = allDates.map((date) => {
  //   return {
  //     label: format(date, "MMM dd"),
  //     totalSales: bookings
  //       .filter((booking) => isSameDay(date, new Date(booking.created_at)))
  //       .reduce((acc, cur) => acc + cur.totalPrice, 0),
  //     extrasSales: bookings
  //       .filter((booking) => isSameDay(date, new Date(booking.created_at)))
  //       .reduce((acc, cur) => acc + cur.extrasPrice, 0),
  //   };
  // });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Connectioins from January &mdash;{" "}
        December{" "}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit=" "
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="connections"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Connections"
            unit=" "
          />
          {/* <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          /> */}
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;

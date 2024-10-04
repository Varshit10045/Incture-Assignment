import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { useSearchParams } from "react-router-dom";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  padding-bottom: 4rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;


function DurationChart({ data }) {
  const { isDarkMode } = useDarkMode();
  const[searchParams, setSearchParams] = useSearchParams();

  const data2 = [{...data.counts.jan, name: "January"}, {...data.counts.feb, name: "February"}, {...data.counts.march, name: "March"}, {...data.counts.april, name: "April"},{...data.counts.may, name: "May"} , {...data.counts.june, name: "June"}, {...data.counts.july, name: "July"}, {...data.counts.aug, name: "August"}, {...data.counts.sept, name: "September"}, {...data.counts.oct, name: "October"}, {...data.counts.nov, name: "November"}, {...data.counts.dec, name: "December"} ]
  const abc = searchParams.get("last") ? searchParams.get("last") : "approved"
  const darkModeColors = [
    "#008080", // Teal
    "#FF8C00", // Dark orange
    "#800080", // Purple
    "#40E0D0", // Turquoise
    "#808000", // Dark green
    "#FF00FF", // Magenta
    "#00FF00", // Lime
    "#FF0000", // Red
    "#FFFF00", // Yellow
    "#0000FF", // Blue
    "#00FFFF", // Cyan
    "#A52A2A" // Brown
  ];
  return (
    <ChartBox>
      <Heading as="h2" style={{textAlign: "center"}}>MONTHLY DATA</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data2}
            nameKey="name"
            dataKey={abc}
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {darkModeColors.map((entry) => (
              <Cell
                fill={entry}
                stroke={entry}
                key={entry}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;

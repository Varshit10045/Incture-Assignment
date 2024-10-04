import DatePicker from "react-datepicker";
import TableOperations from "../../ui/TableOperations";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import styled, {  createGlobalStyle } from 'styled-components';
import { useSearchParams } from "react-router-dom";
import Input from "../../ui/Input";

const DatePickerWrapperStyles = createGlobalStyle`
    .date_picker {
        background-color: var(--color-grey-0);
        color: inherit;
    }
`;
const DatePickerWrapperStyles2 = createGlobalStyle`
    .date_picker2 {
        background-color: var(--color-grey-0);
        color: inherit;
    }
`;

const TableOperations2 = styled.div`
  display: flex;
  align-items: center;
  gap: 10rem;
  justify-content: flex-end;
`;

function CabinTableOperations() {
  // using state for saving dates and search
  const [selectedDate, setSelectedDate] = useState()
  const [selectedDate2, setSelectedDate2] = useState()
  const[search, setSearch] = useState()
  //we will set the dates and search in params 
  const [searchParams, setsearchParams] = useSearchParams()

  return (
    <TableOperations2>
      <Input type="number" placeholder="Search By ID" onChange={(e) => {
        setSearch(Number(e.target.value))}}
        onKeyDown={(e) => {
          if(e.key === "Enter") {
            console.log(typeof search, search)
            if(search === undefined){
              searchParams.delete("search");
              setsearchParams(searchParams);
            }
            else{
              searchParams.set("search", search);
              setsearchParams(searchParams);
            }
            }
        }}/>
      <TableOperations>
      <h4>Filter by date range</h4>

      <DatePicker placeholderText="from" selected={selectedDate} onChange={(Date) => {setSelectedDate(Date)
        searchParams.set("from", Date);
        setsearchParams(searchParams)
      } } wrapperClassName = 'date_picker'/>
        <DatePickerWrapperStyles />
      <DatePicker placeholderText="to" selected={selectedDate2} onChange={(Date) => {
        setSelectedDate2(Date)
        searchParams.set("to", Date);
        setsearchParams(searchParams)} } wrapperClassName = 'date_picker2'/>
        <DatePickerWrapperStyles2 />
        </TableOperations>
    </TableOperations2>
  );
}

export default CabinTableOperations;

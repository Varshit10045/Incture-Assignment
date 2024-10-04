import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";
import moment from "moment-timezone";
export async function getBookings({ page, from: from2, to: to2, search }) {
  let query = supabase
    .from("userdata")
    .select(
      "*",
      { count: "exact" }
    ).order("ID");


  const { data: data2 } = await query;

  const data3 = data2.map((user) => {
    const newD = moment(user.Date_of_Application, "DD/MM/YY")
    const newDO = newD.toDate()
    return {
      ...user,
      Date_of_Application: newDO
    }
  })
  let data4 = undefined;
  let len = 0;
  if(from2 !== "null" && to2 !== "null"){
    data4 = data3.filter((user) => {
      const ud = new Date(user.Date_of_Application).getTime();
      const from3 = new Date(from2).getTime();
      const to3 = new Date(to2).getTime();
      return ud >= from3 && ud <= to3
    } );
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }
  if (page && data4) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    len = data4.length
    data4 = data4.slice(from , to + 1)
  }
  const { data, error, count } = await query;
  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }
  let SF = {}
  if(search){
    console.log(data2)
    for(let i = 0; i < data2.length; i++){
      if(data2[i].ID === search) SF = data2[i];
    }
  }

  let SF2 = {}
  if(search){
    for(let i = 0; i < data4?.length; i++){
      if(data4[i].ID === search) SF2 = data4[i];
    }
  }
  // console.log(typeof search)
  if(from2 === null && to2 === null && Boolean(search) == false ) return {data, count}
  if(from2 === "null" || to2 === "null") {
    if(Boolean(search) == false) {return {data, count}}
    if(Boolean(search) == true && Boolean(SF.ID))  {return {data: [SF], count: 1}}
    if(Boolean(search) == true && Boolean(!SF.ID)) {return {data: [], count: 0}}
  }
  console.log("hi")
  if(Boolean(from2) && Boolean(to2) && Boolean(search)){
    if(Boolean(SF2.ID)) return {data: [SF2], count: 1}
    else return {data: [], count: 0}
  }
  if(Boolean(search) && Boolean(SF.ID)) return {data: [SF], count: 1}
  if(Boolean(data4)) return {data: data4, count: len}
  if(Boolean(data4) && data4.length === 0) return {data: [], count: 0}
  return { data, count };
}



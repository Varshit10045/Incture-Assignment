import supabase from "./supabase";

export async function getConnections() {
  const { data, error } = await supabase.from("userdata").select("*");

  const counts = {
    approved: 0,
    pending: 0,
    connection_released: 0,
    rejected: 0,
    jan : {
      approved: 0,
      pending: 0,
      connection_released: 0,
      rejected: 0
    },
    feb : {
      approved: 0,
      pending: 0,
      connection_released: 0,
      rejected: 0
    },
    march : {
      approved: 0,
      pending: 0,
      connection_released: 0,
      rejected: 0
    },
    april : {
      approved: 0,
      pending: 0,
      connection_released: 0,
      rejected: 0
    },
    may : {
      approved: 0,
      pending: 0,
      connection_released: 0,
      rejected: 0
    },
    june : {
      approved: 0,
      pending: 0,
      connection_released: 0,
      rejected: 0
    },
    july : {
      approved: 0,
      pending: 0,
      connection_released: 0,
      rejected: 0
    },
    aug : {
      approved: 0,
      pending: 0,
      connection_released: 0,
      rejected: 0
    },
    sept : {
      approved: 0,
      pending: 0,
      connection_released: 0,
      rejected: 0
    },
    oct : {
      approved: 0,
      pending: 0,
      connection_released: 0,
      rejected: 0
    },
    nov : {
      approved: 0,
      pending: 0,
      connection_released: 0,
      rejected: 0
    },
    dec : {
      approved: 0,
      pending: 0,
      connection_released: 0,
      rejected: 0
    },
  }
  for(let i =0; i < data.length; i++){
    if(data[i].Status === "Approved") {
      let mon = data[i].Date_of_Application.split("/")[1];
      if(mon === "01") counts.jan.approved = counts.jan.approved + 1
      if(mon === "02") counts.feb.approved = counts.feb.approved + 1
      if(mon === "03") counts.march.approved = counts.march.approved + 1
      if(mon === "04") counts.april.approved = counts.april.approved + 1
      if(mon === "05") counts.may.approved = counts.may.approved + 1
      if(mon === "06") counts.june.approved = counts.june.approved + 1
      if(mon === "07") counts.july.approved = counts.july.approved + 1
      if(mon === "08") counts.aug.approved = counts.aug.approved + 1
      if(mon === "09") counts.sept.approved = counts.sept.approved + 1
      if(mon === "10") counts.oct.approved = counts.oct.approved + 1
      if(mon === "11") counts.nov.approved = counts.nov.approved + 1
      if(mon === "12") counts.dec.approved = counts.dec.approved + 1
      counts.approved = counts.approved + 1}
    else if(data[i].Status === "Pending") {
      let mon = data[i].Date_of_Application.split("/")[1];
      if(mon === "01") counts.jan.pending = counts.jan.pending + 1
      if(mon === "02") counts.feb.pending = counts.feb.pending + 1
      if(mon === "03") counts.march.pending = counts.march.pending + 1
      if(mon === "04") counts.april.pending = counts.april.pending + 1
      if(mon === "05") counts.may.pending = counts.may.pending + 1
      if(mon === "06") counts.june.pending = counts.june.pending + 1
      if(mon === "07") counts.july.pending = counts.july.pending + 1
      if(mon === "08") counts.aug.pending = counts.aug.pending + 1
      if(mon === "09") counts.sept.pending = counts.sept.pending + 1
      if(mon === "10") counts.oct.pending = counts.oct.pending + 1
      if(mon === "11") counts.nov.pending = counts.nov.pending + 1
      if(mon === "12") counts.dec.pending = counts.dec.pending + 1
      counts.pending = counts.pending + 1}
    else if(data[i].Status === "Connection Released") {
      let mon = data[i].Date_of_Application.split("/")[1];
      if(mon === "01") counts.jan.connection_released = counts.jan.connection_released + 1
      if(mon === "02") counts.feb.connection_released = counts.feb.connection_released + 1
      if(mon === "03") counts.march.connection_released = counts.march.connection_released + 1
      if(mon === "04") counts.april.connection_released = counts.april.connection_released + 1
      if(mon === "05") counts.may.connection_released = counts.may.connection_released + 1
      if(mon === "06") counts.june.connection_released = counts.june.connection_released + 1
      if(mon === "07") counts.july.connection_released = counts.july.connection_released + 1
      if(mon === "08") counts.aug.connection_released = counts.aug.connection_released + 1
      if(mon === "09") counts.sept.connection_released = counts.sept.connection_released + 1
      if(mon === "10") counts.oct.connection_released = counts.oct.connection_released + 1
      if(mon === "11") counts.nov.connection_released = counts.nov.connection_released + 1
      if(mon === "12") counts.dec.connection_released = counts.dec.connection_released + 1
      counts.connection_released = counts.connection_released + 1}
    else {
      let mon = data[i].Date_of_Application.split("/")[1];
      if(mon === "01") counts.jan.rejected = counts.jan.rejected + 1
      if(mon === "02") counts.feb.rejected = counts.feb.rejected + 1
      if(mon === "03") counts.march.rejected = counts.march.rejected + 1
      if(mon === "04") counts.april.rejected = counts.april.rejected + 1
      if(mon === "05") counts.may.rejected = counts.may.rejected + 1
      if(mon === "06") counts.june.rejected = counts.june.rejected + 1
      if(mon === "07") counts.july.rejected = counts.july.rejected + 1
      if(mon === "08") counts.aug.rejected = counts.aug.rejected + 1
      if(mon === "09") counts.sept.rejected = counts.sept.rejected + 1
      if(mon === "10") counts.oct.rejected = counts.oct.rejected + 1
      if(mon === "11") counts.nov.rejected = counts.nov.rejected + 1
      if(mon === "12") counts.dec.rejected = counts.dec.rejected + 1
      counts.rejected = counts.rejected + 1}
  }
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return {data, counts};
}


export async function createNConnection(newCabin){
  const { error, data, count } = await supabase
    .from('userdata')
    .select('*', { count: 'exact' }).order("ID");
  newCabin.ID = data[data.length - 1].ID + 1;
  console.log(newCabin)
  let query = supabase.from("userdata").insert(newCabin);
  const {data: data2, error: error2} = await query;

  return {data2, error2};

}

export async function createEditConnection(newCabin) {
  let query = supabase.from("userdata");


  query = query.update({ ...newCabin }).eq("ID", newCabin.ID);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }


  return data;
}

export async function deleteConnection(id) {
  const { data, error } = await supabase.from("userdata").delete().eq("ID", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

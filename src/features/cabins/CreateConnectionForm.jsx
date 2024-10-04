import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useEditConnection } from "./useEditConnection";
import {useCreateConnection} from "./useCreateConnection";
import moment from "moment";


// Create or Edit form, implemented using react-hook-form
function CreateConnectionForm({ connectionToEdit = {}, onCloseModal, page }) {
  const {isCreating, createConnection} = useCreateConnection()
  const { isEditing, editConnection } = useEditConnection();
  const isWorking = false;
  let isCreate = false;
  const {ID: id} = connectionToEdit;
  const lastApp = connectionToEdit.Date_of_Approval ? true : false
  if(!id) isCreate = true;
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: connectionToEdit
  });
  const { errors } = formState;

  function onSubmit(data) {
      //Changing data type to match with what we used in supabase, also changing the modified date to today
      const newData = {...data, Pincode: Number(data.Pincode), Load_Applied: Number(data.Load_Applied), Reviewer_ID: Number(data.Reviewer_ID)}
      newData.Modified_Date = moment(new Date()).format("DD/MM/YY");
      // if the connection is approved just now we are setting the date of approval to today
      if(!lastApp && newData.Status.toLowerCase() === "approved") {
        newData.Status = "Approved";
        newData.Date_of_Approval = moment(new Date()).format("DD/MM/YY")};
      if(newData.Status.toLowerCase() === "rejected") newData.Status = "Rejected";
      if(newData.Status.toLowerCase() === "connection released") newData.Status = "Connection Released";
      if(newData.Status.toLowerCase() === "pending") newData.Status = "Pending";
      if(newData.Status.toLowerCase() === "approved") newData.Status = "Approved"
      if(!isCreate) editConnection(newData)
      else {
        if(newData.Status.toLowerCase() === "approved")newData.Date_of_Approval = moment(new Date()).format("DD/MM/YY")
        createConnection(newData)
      }
    }
    
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
      >
      <FormRow type="four">

      <FormRow label="Governemnt ID" error={errors?.name?.message}>
        <Input
          type="text"
          id="GovtID_Type"
          disabled={isCreate ? false : true}
          {...register("GovtID_Type", {
            required: "This field is required",
          })}
          />
      </FormRow>
      <FormRow label="Date of Application" error={errors?.name?.message}>
        <Input
          type="text"
          id="Date_of_Application"
          placeholder="DD/MM/YY"
          disabled={isCreate ? false : true}
          {...register("Date_of_Application", {
            required: "This field is required",
          })}
          />
      </FormRow>
      </FormRow>

       <FormRow type="four">
      <FormRow label="ID" error={errors?.name?.message}>
        <Input
          type="Number"
          id="ID"
          disabled={true}
          value={connectionToEdit.ID}
        />
      </FormRow>

      <FormRow label="Load Applied" error={errors?.maxCapacity?.message}>
        <Input
          type= "Number"
          id="Load_Applied"
          disabled={isWorking}
          {...register("Load_Applied", {
            required: "This field is required",
            min: {
              value: 0,
              message: "Load Applied should be negative",
            },
            max:{
              value: 200, // to enforce that the max value doesn't go above 200
              message: "Load Applied should not exceed 200kV"
            }
          })}
          />
      </FormRow>
      </FormRow> 

      <FormRow type = "four" >

      <FormRow label="ID Number" error={errors?.name?.message}>
        <Input
          type="Number"
          id="ID_Number"
          disabled={isCreate ? false : true}
          {...register("ID_Number", {
            required: "This field is required",
            type: Number
          })}
          />
      </FormRow>
      <FormRow label="Category" error={errors?.name?.message}>
        <Input
          type="text"
          id="Category"
          disabled={false}
          {...register("Category", {
            required: "This field is required",
          })}
          />
      </FormRow>
        </FormRow>
          
          <FormRow type="four">

      <FormRow label="Reviewer ID" error={errors?.name?.message}>
        <Input
          type="Number"
          id="Reviewer_ID"
          disabled={false}
          {...register("Reviewer_ID", {
            required: "This field is required",
          })}
          />
      </FormRow>
      <FormRow label="Reviewer Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="Reviewer_Name"
          disabled={false}
          {...register("Reviewer_Name", {
            required: "This field is required",
          })}
          />
      </FormRow>
          </FormRow>

          <FormRow type="four">

      <FormRow label="Status" error={errors?.name?.message}>
        <Input
          type="text"
          id="Status"
          disabled={getValues().Status === "Approved" ? true : false }
          {...register("Status", {
            required: "This field is required",
            validate: (value) => {
              const test = value.toLowerCase();
              return (test === "rejected" || test === "connection released" || test === "pending" || test === "approved") || "Only permissible status are rejected, connection released, approved, pending"
            }
          })}
          />
      </FormRow>
      <FormRow label="Ownership" error={errors?.name?.message}>
        <Input
          type="text"
          id="Ownership"
          disabled={false}
          {...register("Ownership", {
            required: "This field is required",
          })}
          />
      </FormRow>
          </FormRow>

          <FormRow type="four">

      <FormRow label="Pincode" error={errors?.name?.message}>
        <Input
          type="Number"
          id="Pincode"
          disabled={false}
          {...register("Pincode", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="State" error={errors?.name?.message}>
        <Input
          type="text"
          id="State"
          disabled={false}
          {...register("State", {
            required: "This field is required",
          })}
          />
      </FormRow>
          </FormRow>

          <FormRow type="four">

      <FormRow label="District" error={errors?.name?.message}>
        <Input
          type="text"
          id="District"
          disabled={false}
          {...register("District", {
            required: "This field is required",
          })}
          />
      </FormRow>
      <FormRow label="Gender" error={errors?.name?.message}>
        <Input
          type="text"
          id="Gender"
          disabled={false}
          {...register("Gender", {
            required: "This field is required",
          })}
          />
      </FormRow>
          </FormRow>

          <FormRow label="Date of Approval" error={errors?.name?.message}>
        <Input
          type="text"
          id="Date_of_Approval"
          disabled={true}
          value={connectionToEdit.Date_of_Approval}
          
          />
      </FormRow>   



      <FormRow
        label="Reviewers Comments"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="Reviewer_Comments"
          defaultValue=""
          disabled={false}
          {...register("Reviewer_Comments", {
            required: "This field is required",
          })}
        />
      </FormRow>


      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={false}>
          {"Edit User" }
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateConnectionForm;

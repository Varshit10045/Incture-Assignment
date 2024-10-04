import styled from "styled-components";
import { useDeleteConnection } from "./useDeleteConnection";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import CreateConnectionForm from "./CreateConnectionForm";


const Connection = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;


//using conditional rendering so that delete button will only be visible if the status of connection is rejected
function ConnectionRow({ connection, page }) {
  const { isDeleting, deleteConnection } = useDeleteConnection();
  const {
    ID,
    Applicant_Name,
    Gender,
    District,
    ID_Number,
  } = connection;
  

  return (
    <Table.Row>
      <Connection>{ID}</Connection>
      <Connection>{Applicant_Name}</Connection>
      <div>{Gender}</div>
      <Connection>{District}</Connection>
      <Connection>{ID_Number}</Connection>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={ID} />

            <Menus.List id={ID}>
              <Menus.Button
                icon={<HiSquare2Stack />}
              >
                View
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              {
                connection.Status === "Rejected" ?
                <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
              : ""}

            </Menus.List>

            <Modal.Window name="edit">
              <CreateConnectionForm connectionToEdit={connection} page = {page} />
            </Modal.Window>
            { connection.Status === "Rejected" ?

              <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="connection"
                disabled={isDeleting}
                onConfirm={() => deleteConnection(connection.ID)}
                />
            </Modal.Window>
             : " " }

          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default ConnectionRow;

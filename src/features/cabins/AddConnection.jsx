import Button from "../../ui/Button";
import CreateConnectionForm from "./CreateConnectionForm";
import Modal from "../../ui/Modal";

//using compound component pattern to make a reusable modal window
function AddConnection() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new connection</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          {/* displays an empty form */}
          <CreateConnectionForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}


export default AddConnection;

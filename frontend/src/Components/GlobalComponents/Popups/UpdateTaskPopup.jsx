/**
 * Invite user popup 
 */
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Button, Modal, Form } from "react-bootstrap";

function UpdateTaskPopup({ popupRef, callback }) {

   let data = null;
   if (popupRef && popupRef?.current?.data) {
      data = popupRef.current?.data?.current
   }

   /**Initial state */
   const [description, setDescription] = useState(data.task.description)
   const [completed, setCompleted] = useState(data.task.completed);

   /**
    * Function is called on form submission.
    * Send popup data with callback in parent component and show toast.
    */
   const onSubmitForm = (e) => {
      e.preventDefault()
      // Check if noteText is not empty
      if (description.trim() !== '') {
         // Perform any additional logic or validation here if needed
         const callBackData = { id: data.task._id, description, completed }
         callback(true, callBackData);
      } else {
         // Display an error message or handle the case when noteText is empty
         toast.error("Task description cannot be empty!");
      }
   }

   return (
      <Fragment>
         <Modal.Body className="custom-popup__content">
            <Form id="updateTask" onSubmit={onSubmitForm}>
               <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" required rows={3} placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
               </Form.Group>
               <Form.Check
                  type="radio"
                  name="completionStatus"
                  label="Complete"
                  id="complete"
                  value="complete"
                  checked={completed}
                  onChange={() => setCompleted(!completed)}
               />
               <Form.Check
                  type="radio"
                  name="completionStatus"
                  label="Incomplete"
                  id="incomplete"
                  value="incomplete"
                  checked={!completed}
                  onChange={() => setCompleted(!completed)}
               />
            </Form>
         </Modal.Body>
         <Modal.Footer className="custom-popup__footer flex-column-reverse flex-sm-row gap-2 gap-sm-3 border-top-0">
            <Button variant="dark" type="button" aria-label="Cancel" size="sm" onClick={() => callback(false)} className="m-0">
               Cancel
            </Button>
            <Button variant="primary" form="updateTask" type="submit" size="sm" aria-label="Update Note" className="m-0">
               Update
            </Button>
         </Modal.Footer>
      </Fragment>
   )
}

/** Props types */
UpdateTaskPopup.propTypes = {
   callback: PropTypes.func,
};

export { UpdateTaskPopup };
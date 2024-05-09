/**
 * Confirmation Popup Component 
 **/
import { Fragment } from "react"
import PropTypes from "prop-types"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { Badge } from "react-bootstrap"

const ViewTaskPopup = ({ callback, popupRef, cancelBtnText = "Close" }) => {

   let data = null;
   if (popupRef && popupRef?.current?.data) {
      data = popupRef.current?.data?.current
   }

   return (
      <Fragment>
         <Modal.Body className="custom-popup__content">
            <div className='d-flex flex-column flex-wrap gap-2'>
               <div className="d-flex flex-wrap align-items-center gap-2">
                  <span className="fw-bold fs-3">{data?.task?.description}</span>
                  <Badge
                     className={`fw-semibold ${data?.task?.completed === true ? "bg-success-subtle text-success-emphasis" : "bg-warning-subtle text-warning-emphasis"}`}
                  >
                     {data?.task?.completed === true ? "Completed" : "Incomplete"}
                  </Badge>
               </div>
               <div className='d-md-flex align-items-center gap-2'>
                  <p className='fw-bold mb-0'>Created on:</p>
                  <span>{new Date(data?.task?.createdAt).toLocaleString('en-IN')}</span>
               </div>
            </div>
         </Modal.Body>
         <Modal.Footer className="custom-popup__footer border-top-0">
            <Button type="button" variant="dark" size="sm" className="m-0" onClick={() => callback(false)}>{cancelBtnText}</Button>
         </Modal.Footer>
      </Fragment>
   )
}

// props validation
ViewTaskPopup.propTypes = {
   callback: PropTypes.func.isRequired,   // callback is a function which fire the action when the user press the yes/no button
   cancelBtnText: PropTypes.string,
   popupRef: PropTypes.object,
};

export { ViewTaskPopup };

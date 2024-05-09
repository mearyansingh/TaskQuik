/**
 * Confirmation Popup Component 
 **/
import { Fragment } from "react"
import PropTypes from "prop-types"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

const ConfirmPopup = ({ message = "", callback, popupRef, submitBtnText = "Yes", cancelBtnText = "Cancel", icon = "bi bi-exclamation-triangle", title = "", description = "", iconWrapper = "custom-popup__icon--danger" }) => {

   let data = null;
   if (popupRef && popupRef?.current?.data) {
      data = popupRef.current?.data?.current
   }

   return (
      <Fragment>
         <Modal.Body className="custom-popup__content">
            <div className="d-flex flex-column flex-sm-row text-center text-sm-start">
               <div className={`custom-popup__icon rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 mx-auto mb-3 mb-sm-0 ${iconWrapper}`}>
                  <i className={`fs-20 ${icon}`}></i>
               </div>
               <div className="ms-sm-3 flex-grow-1">
                  {title !== "" && <h5 className="">{`${title}`}</h5>}
                  {message !== "" && <p className="mb-0 fs-17">{message}</p>}
                  {(description !== "") && <p className="mb-0 mt-1">{description}</p>}
               </div>
            </div>
         </Modal.Body>
         <Modal.Footer className="custom-popup__footer border-top-0 gap-2 gap-sm-3 flex-column-reverse flex-sm-row">
            <Button type="button" className="m-0" variant="dark" size="sm" onClick={() => callback(false)}>{cancelBtnText}</Button>
            <Button type="button" className="m-0" variant="primary" size="sm" onClick={() => callback(true, data)}>{submitBtnText}</Button>
         </Modal.Footer>
      </Fragment>
   )
}

// props validation
ConfirmPopup.propTypes = {
   callback: PropTypes.func.isRequired,   // callback is a function which fire the action when the user press the yes/no button
   title: PropTypes.string.isRequired,
   message: PropTypes.string,  // message ia a string that passed to display the text.
   description: PropTypes.string,
   submitBtnText: PropTypes.string,
   cancelBtnText: PropTypes.string,
   popupRef: PropTypes.object,
   icon: PropTypes.string,
   iconWrapper: PropTypes.string
};

export { ConfirmPopup };

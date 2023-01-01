import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = ({ closeModal }) => {
  return <div className={classes.backdrop} onClick={closeModal} />;
};

const ModalOverlay = (props) => {
  return <div className={classes.modal}>{props.children}</div>;
};

const overlay = document.getElementById("overlay");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        overlay
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        overlay
      )}
    </>
  );
};

export default Modal;

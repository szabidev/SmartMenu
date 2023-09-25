import { FC, Fragment } from "react";
import ReactDOM from "react-dom";

import "./Modal.css";

const Backdrop: FC<{ onClose: () => void }> = ({ onClose }) => {
  return <div className="backdrop" onClick={onClose} />;
};

const ModalOverlay: FC<{
  children: string | JSX.Element | JSX.Element | undefined;
}> = ({ children }) => {
  return (
    <div className="modal">
      <div className="content">{children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal: FC<{
  children: string | JSX.Element | JSX.Element | undefined;
  onClose: () => void;
}> = ({ children, onClose }) => {
  return (
    <Fragment>
      {portalElement &&
        ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {portalElement &&
        ReactDOM.createPortal(
          <ModalOverlay>{children}</ModalOverlay>,
          portalElement
        )}
    </Fragment>
  );
};

export default Modal;

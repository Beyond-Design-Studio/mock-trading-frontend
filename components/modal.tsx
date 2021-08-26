import React, { FC } from "react";
import { createPortal } from "react-dom";

interface propTypes {
  isVisible: boolean;
  toggleModal: () => void;
  children?: JSX.Element | JSX.Element[];
  showClose?: boolean;
	backgroundColor?: string;
}

const Modal: FC<propTypes> = ({
  isVisible,
  toggleModal,
  children,
  showClose,
	backgroundColor,
}) => {

  return isVisible
    ? createPortal(
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: backgroundColor ? backgroundColor : "rgba(0, 0, 0, 0.3)",
            position: "fixed",
            top: "0",
          }}
        >
          {showClose === undefined || showClose === true ? (
            <button className="close_button" onClick={toggleModal} style={{
							border: "none",
							borderRadius: "50%",
							background: "white",
							opacity: "70%",
							padding: "0.25rem",
							margin: "0.75rem",
							cursor: "pointer",
							position: "absolute",
							right: "1rem",
							top: "0",
						}}>
              ❌
            </button>
          ) : null}
          <div>{children}</div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;

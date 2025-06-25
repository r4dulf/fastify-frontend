import { createPortal } from "react-dom";
import { Button } from "../Button";
import "./index.scss";

export const Modal = ({
  headerText,
  onClose,
  children,
}: {
  headerText: string;
  onClose: () => void;
  children: React.ReactNode;
}) =>
  createPortal(
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{headerText}</h2>

          <Button
            className="close-button"
            kind="primary"
            size="small"
            onClick={onClose}
          >
            &times;
          </Button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body
  );

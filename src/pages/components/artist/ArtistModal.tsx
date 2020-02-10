import React from "react";
import { Modal } from "react-bulma-components";

type ArtistModal = {
  title?: string;
  footer?: string;
  // React-bulma-Modal
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
  closeOnEsc?: boolean;
  closeOnBlur?: boolean;
  showClose?: boolean;
  document?: {};
};

export function ArtistModal(props: ArtistModal) {
  const { title, children, footer, onClose } = props;
  return (
    <Modal {...props}>
      <Modal.Card>
        <Modal.Card.Head onClose={onClose}>
          <Modal.Card.Title>{title}</Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body>
          {children}
        </Modal.Card.Body>
        <Modal.Card.Foot
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <p>{footer}</p>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal>
  );
}

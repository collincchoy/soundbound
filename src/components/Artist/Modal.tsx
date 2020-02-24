import React, { useEffect, useRef } from "react";

type ArtistModal = {
  title?: string;
  footer?: string;
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
  closeOnEsc?: boolean;
  closeOnBlur?: boolean;
};

export function ArtistModal({
  title,
  show,
  onClose,
  children,
  footer,
  closeOnEsc,
  closeOnBlur,
  ...props
}: ArtistModal) {
  const modalCardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!modalCardRef.current?.contains(e.target as Node)) {
        // Click is not inside the modal card
        onClose();
      }
    };
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && show) {
        onClose();
      }
    };
    if (show) {
      if (closeOnEsc) document.addEventListener("keydown", handleKeydown);
      if (closeOnBlur)
        document.addEventListener("mousedown", handleClickOutside);
    } else {
      if (closeOnEsc) document.removeEventListener("keydown", handleKeydown);
      if (closeOnBlur)
        document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOnEsc, closeOnBlur, show, onClose]);
  return (
    <div className={`modal ${show ? "is-active" : ""}`}>
      <div className="modal-card" ref={modalCardRef}>
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={onClose} />
        </header>
        <section className="modal-card-body">{children}</section>
        <footer
          className="modal-card-foot"
          style={{ justifyContent: "center" }}
        >
          <p>{footer}</p>
        </footer>
      </div>
    </div>
  );
}

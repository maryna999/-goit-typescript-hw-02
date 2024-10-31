import React, { useEffect } from "react";
import Modal from "react-modal";
import s from "./ImageModal.module.css";

interface Image {
  urls: { regular: string };
  alt_description: string;
  description?: string;
  user: { name: string };
  likes: number;
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: Image | null;
}

Modal.setAppElement("#root");

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, image }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  return (
    <Modal
      className={s.modal}
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      overlayClassName={s.overlay}
    >
      {image && (
        <div className={s.content}>
          <img
            src={image.urls.regular}
            alt={image.alt_description}
            className={s.image}
          />
          <p className={s.description}>
            {image.description || image.alt_description}
          </p>
          <p className={s.description}>Author: {image.user.name}</p>
          <p className={s.description}>Likes: {image.likes}</p>
          <button className={s.closeBtn} onClick={onClose}>
            Close
          </button>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;

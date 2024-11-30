import style from "./modal.module.scss";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
};

const Modal = ({ children, isOpen }: ModalProps) => {
  return (
    <div className={isOpen ? style.modal : style.hidden}>
      <div className={style.modalContent}>{children}</div>
    </div>
  );
};

export default Modal;

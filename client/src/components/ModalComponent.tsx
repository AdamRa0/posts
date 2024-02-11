import { ReactNode } from "react";
import ButtonComponent from "./ButtonComponent";
import styles from "./modalcomponent.module.css";

type modalComponentProps = {
  children: ReactNode;
  closeModal: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function ModalComponent({
  children,
  closeModal,
}: modalComponentProps) {
  return (
    <div className={styles.modal}>
      <div className={styles.buttonContainer}>
        <ButtonComponent variant={"modalButton"} onClick={closeModal}>
          &times;
        </ButtonComponent>
      </div>
      {children}
    </div>
  );
}

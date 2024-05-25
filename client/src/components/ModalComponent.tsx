import { ReactNode } from "react";
import ButtonComponent from "./ButtonComponent";
import styles from "./modalcomponent.module.css";

type modalComponentProps = {
  children: ReactNode;
  closeModal: (event: React.MouseEvent<HTMLElement>) => void;
  isVisible?: boolean;
  goBack?: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function ModalComponent({
  children,
  closeModal,
  goBack,
  isVisible = false,
}: modalComponentProps) {
  return (
    <div className={styles.modal}>
      <div
        className={
          isVisible ? styles.buttonContainer : styles.buttonContainerAlt
        }
      >
        {isVisible && goBack !== undefined ? (
          <ButtonComponent variant={"modalButton"} onClick={goBack}>
            &larr;
          </ButtonComponent>
        ) : null}
        <ButtonComponent variant={"modalButton"} onClick={closeModal}>
          &times;
        </ButtonComponent>
      </div>
      {children}
    </div>
  );
}

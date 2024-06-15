import ButtonComponent from "./ButtonComponent";
import styles from "./modalcomponent.module.css";
import { ModalComponentProps } from "types/props/ModalComponentProps";

export default function ModalComponent({
  children,
  closeModal,
  goBack,
  isVisible = false,
  variant = "modal"
}: ModalComponentProps) {
  return (
    <div className={styles[variant]}>
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

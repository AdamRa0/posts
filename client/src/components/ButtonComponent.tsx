import { ReactNode } from "react";
import styles from "./buttoncomponent.module.css";

type buttonComponentProps = {
  type: string;
  onButtonClick?: (event: React.MouseEvent<HTMLElement>) => void;
  children: ReactNode;
};

export default function ButtonComponent({
  onButtonClick,
  type,
  children,
}: buttonComponentProps) {
  return (
    <button
      className={`${
        type === "modalButton" || type === "moreOptions"
          ? null
          : styles.primaryButton
      } ${styles[type]}`}
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
}

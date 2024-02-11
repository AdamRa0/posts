import { ReactNode } from "react";
import styles from "./buttoncomponent.module.css";

type buttonComponentProps = React.ComponentProps<"button"> & {
  variant: string;
  children: ReactNode;
};

export default function ButtonComponent({
  onClick,
  type = "button",
  variant,
  children,
}: buttonComponentProps) {
  return (
    <button
      type={type}
      className={`${
        variant === "modalButton" || variant === "moreOptions"
          ? null
          : styles.primaryButton
      } ${styles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

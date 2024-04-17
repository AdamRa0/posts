import { ReactNode } from "react";
import styles from "./buttoncomponent.module.css";

type buttonComponentProps = React.ComponentProps<"button"> & {
  variant: string;
  children: ReactNode;
};

export default function ButtonComponent({
  variant,
  children,
  ...others
}: buttonComponentProps) {
  return (
    <button
      className={`${
        variant === "modalButton" || variant === "moreOptions" || variant === "tabButton"
          ? null
          : styles.primaryButton
      } ${styles[variant]}`}
      {...others}
    >
      {children}
    </button>
  );
}

import { ReactNode } from "react";
import styles from "./buttoncomponent.module.css";

type buttonComponentProps = React.ComponentProps<"button"> & {
  variant: string;
  children: ReactNode;
};

const buttonVariants: string[] = [
  "modalButton",
  "moreOptions",
  "tabButton",
  "settingsButton",
  "priorityOneButton",
  "priorityTwoButton",
  "priorityThreeButton",
  "modalButtonOne",
  "modalButtonThree",
];

export default function ButtonComponent({
  variant,
  children,
  ...others
}: buttonComponentProps) {
  return (
    <button
      className={`${
        buttonVariants.includes(variant) ? null : styles.primaryButton
      } ${styles[variant]}`}
      {...others}
    >
      {children}
    </button>
  );
}

import React, { ReactNode } from "react";
import styles from "./buttoncomponent.module.css";

type buttonComponentProps = React.ComponentProps<"button"> & {
  variant: string;
  children: ReactNode;
};

const buttonVariants: string[] = [
  "modalButton",
  "postBackButton",
  "moreOptions",
  "tabButton",
  "settingsButton",
  "priorityOneButton",
  "priorityTwoButton",
  "priorityThreeButton",
  "modalButtonOne",
  "modalButtonThree",
  "addCommentButton",
];

export default function ButtonComponent({
  variant,
  children,
  ...others
}: buttonComponentProps): React.JSX.Element {
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

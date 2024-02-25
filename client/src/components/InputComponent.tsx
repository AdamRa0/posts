import React from "react";
import styles from "./inputcomponent.module.css";

type inputProps = React.ComponentProps<"input"> & {
  className: string;
};

export default function InputComponent({ className, ...others }: inputProps) {
  return <input className={styles[className]} {...others} />;
}

"use client";

import styles from "./inputcomponent.module.scss";

export default function InputComponent({
  type,
  placeholder,
  id,
  handleOnChange,
  name,
  required,
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={styles.inputStyle}
      name={name}
      onChange={(e) => {
        handleOnChange(e, name);
      }}
      required={required}
    />
  );
}

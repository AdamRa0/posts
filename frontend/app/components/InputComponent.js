import styles from "./inputcomponent.module.scss";

export default function InputComponent({ type, placeholder, id }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={styles.inputStyle}
    />
  );
}

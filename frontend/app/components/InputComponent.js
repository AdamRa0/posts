import styles from "./inputcomponent.module.scss";

export default function InputComponent({ type, placeholder }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={styles.inputStyle}
    />
  );
}

import styles from "./button.module.scss";

export default function Button({ text, handleOnClick, type }) {
  return (
    <button className={styles.button} onClick={handleOnClick} type={type}>
      {text}
    </button>
  );
}

import styles from "./button.module.scss";

export default function Button({ text, handleOnClick, type, disable }) {
  console.log(disable);
  return (
    <button
      className={styles.button}
      onClick={handleOnClick}
      type={type}
      disabled={disable}
    >
      {text}
    </button>
  );
}

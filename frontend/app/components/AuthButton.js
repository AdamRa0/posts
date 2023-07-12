import styles from "./authbutton.module.scss";

export default function AuthButton({ text, handleOnClick, type }) {
  return (
    <button className={styles.authButton} onClick={handleOnClick} type={type}>
      {text}
    </button>
  );
}

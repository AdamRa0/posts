import styles from "./authbutton.module.scss";

export default function AuthButton({ text }) {
  return <button className={styles.authButton}>{text}</button>;
}

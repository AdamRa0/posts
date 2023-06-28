import styles from "./navbar.module.scss";

export default function Navbar({ children }) {
  return (
    <header className={styles.navbar}>
      <div className={styles.headerLeft}>
        <h1>Posts</h1>
      </div>
      <div className={styles.headerMiddle}>{children}</div>
    </header>
  );
}

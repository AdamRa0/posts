import styles from './majorButton.module.scss';

export default function MajorButton({ text, buttonFunction }) {
  return (
    <button className={styles.majorButton} onClick={buttonFunction}>
      <p>{text}</p>
    </button>
  );
}

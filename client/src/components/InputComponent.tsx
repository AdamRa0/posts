import styles from "./inputcomponent.module.css";

type inputProps = {
  className: string;
  type: string;
  placeholder: string;
};

export default function InputComponent({
  className,
  type,
  placeholder,
}: inputProps) {
  return (
    <input
      className={styles[className]}
      type={type}
      placeholder={placeholder}
    />
  );
}

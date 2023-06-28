import styles from "./unauthRight.module.scss";
import MajorButton from "@/components/majorButton";

export default function UnauthRight({ onButtonClick }) {
  const createAccountText = "Create an account.";
  const signInText = "Sign In";

  return (
    <section className={styles.parentContainer}>
      <div>
        <h2>New to posts?</h2>
        <p className={styles.signupText}>
          Sign up now for a personalized square
        </p>
        <MajorButton text={createAccountText} />
        <p className={styles.tosText}>
          By signing up, you agree to our <span>terms of service</span> and{" "}
          <span>privacy policy</span> including <span>cookie use</span>
        </p>
        <p className={styles.alreadyHaveAccountText}>
          Already have an account?
        </p>
        <MajorButton text={signInText} buttonFunction={onButtonClick}/>
      </div>
    </section>
  );
}

import styles from "./page.module.scss";
import InputComponent from "@/app/components/InputComponent";
import Button from "@/app/components/Button";

import Link from "next/link";
import LogoPlusBrand from "@/app/components/logo-and-brand/LogoPlusBrand";

export default function Page() {
  return (
    <section className={styles.loginForm}>
      <div className={styles.formContainer}>
        <LogoPlusBrand logoDimens={24} />
        <p className={styles.formTitle}>Sign in to your account</p>
        <form>
          <div className={styles.formItem}>
            <label htmlFor="emailAddress">Email</label>
            <InputComponent
              type={"email"}
              placeholder={"email@example.com"}
              id={"emailAddress"}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="password">Password</label>
            <InputComponent type={"password"} id={"password"} />
          </div>
          <Button text={"Continue"} type={"submit"} />
        </form>

        <p>
          Don't have an account? <Link href="/auth/signup">Sign up</Link>
        </p>
      </div>
    </section>
  );
}

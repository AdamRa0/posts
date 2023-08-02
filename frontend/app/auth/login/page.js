"use client";

import styles from "./page.module.scss";
import InputComponent from "@/app/components/inputs/InputComponent";
import Button from "@/app/components/buttons/Button";

import Link from "next/link";
import LogoPlusBrand from "@/app/components/logo-and-brand/LogoPlusBrand";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/loader/Loader";

export default function Page() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();

  function handleOnChange(event, value) {
    switch (value) {
      case "email":
        setEmailAddress(event.target.value);
        break;

      case "password":
        setPassword(event.target.value);
        break;

      default:
        break;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData();

    form.append("email_address", emailAddress);
    form.append("password", password);

    setIsAuthenticating(true);

    try {
      const response = await axios.postForm("/api/v1/auth/signin", form);

      if (response.status === 200) {
        setIsAuthenticating(false);
        router.back();
      }
    } catch (error) {
      setError(error.message);
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return (
      <>
        <div className={styles.loadingPageOverlay}>
          <Loader />
        </div>
      </>
    );
  }

  return (
    <section className={styles.loginForm}>
      <div className={styles.formContainer}>
        <LogoPlusBrand logoDimens={24} />
        <p className={styles.formTitle}>Sign in to your account</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.formItem}>
            <label htmlFor="emailAddress">Email</label>
            <InputComponent
              type={"email"}
              placeholder={"email@example.com"}
              id={"emailAddress"}
              name={"email"}
              handleOnChange={handleOnChange}
              required={true}
            />
          </div>
          <div className={styles.formItem}>
            <label htmlFor="password">Password</label>
            <InputComponent
              type={"password"}
              id={"password"}
              name={"password"}
              handleOnChange={handleOnChange}
              required={true}
            />
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

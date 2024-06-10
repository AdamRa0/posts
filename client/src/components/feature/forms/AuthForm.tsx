import { RenderData } from "types/enums/renderData";
import styles from "@components/feature/forms/authform.module.css";
import ButtonComponent from "@components/ui/ButtonComponent";
import InputComponent from "@components/ui/InputComponent";
import React from "react";
import { AuthFormProps } from "types/props/AuthFormProps";

export default function AuthForm({
  handleToggle,
  state,
  dispatch,
}: AuthFormProps): React.JSX.Element {
  return (
    <>
      <form className={styles.authForm}>
        <div className={styles.inputFields}>
          {(state.count === 0 || state.count === 1 || state.count === 3) && (
            <InputComponent
              className={"formInput"}
              type="text"
              placeholder="Username"
            />
          )}
          {(state.count === 0 || state.count === 2 || state.count === 3) && (
            <InputComponent
              className={"formInput"}
              type="email"
              placeholder="Email Address"
            />
          )}
          {(state.count === 0 || state.count === 1) && (
            <InputComponent
              className={"formInput"}
              type="password"
              placeholder="Password"
            />
          )}
        </div>
        {(state.count === 0 || state.count === 1) && (
          <>
            <p>
              {state.count === 0 ? (
                <span>
                  Forgot your{" "}
                  <ButtonComponent
                    type="button"
                    variant="linkButton"
                    onClick={() => {
                      dispatch(RenderData.FORGOT_USERNAME);
                    }}
                  >
                    username
                  </ButtonComponent>{" "}
                  or{" "}
                  <ButtonComponent
                    type="button"
                    variant="linkButton"
                    onClick={() => {
                      dispatch(RenderData.FORGOT_PASSWORD);
                    }}
                  >
                    password
                  </ButtonComponent>
                  ?
                </span>
              ) : null}
            </p>
            <p>
              {state.count === 1 ? "New to Posts?" : "Already a poster?"}{" "}
              <ButtonComponent
                type="button"
                variant="linkButton"
                onClick={handleToggle}
              >
                {state.count === 1 ? "Sign Up" : "Log In"}
              </ButtonComponent>
            </p>
          </>
        )}
        <div style={{ marginTop: "20px" }}>
          <ButtonComponent type="button" variant={"btnSignInAlt"}>
            {state.count === 0
              ? "Sign Up"
              : state.count === 1
              ? "Log In"
              : state.count === 2
              ? "Email Me"
              : state.count === 3
              ? "Reset Password"
              : ""}
          </ButtonComponent>
        </div>
      </form>
    </>
  );
}

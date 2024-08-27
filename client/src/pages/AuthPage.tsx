import {  useReducer } from "react";
import ModalComponent from "@components/ui/ModalComponent";
import PageOverlayComponent from "@components/ui/PageOverlayComponent";
import { countState } from "types/states/countState";
import { RenderData } from "types/enums/renderData";
import AuthForm from "@components/feature/forms/AuthForm";
import { authPageProps } from "types/props/AuthPageProps";

function reducer(currentState: countState, action: RenderData) {
  switch (action) {
    case RenderData.SIGNUP:
      return {
        ...currentState,
        count: 0,
      };

    case RenderData.LOGIN:
      return {
        ...currentState,
        count: 1,
      };

    case RenderData.FORGOT_USERNAME:
      return {
        ...currentState,
        count: 2,
      };

    case RenderData.FORGOT_PASSWORD:
      return {
        ...currentState,
        count: 3,
      };

    default:
      throw new Error("Undefined action");
  }
}

export default function AuthPage({ closeModal }: authPageProps) {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  function handleToggle(): void {
    if (state.count === 0) {
      dispatch(RenderData.LOGIN);
    } else if (state.count === 1) {
      dispatch(RenderData.SIGNUP);
    }
  }

  function goBack() {
    dispatch(RenderData.SIGNUP);
  }

  return (
    <>
      <PageOverlayComponent>
        <ModalComponent
          isVisible={state.count === 2 || state.count === 3 ? true : false}
          goBack={state.count === 2 || state.count === 3 ? goBack : () => {}}
          closeModal={closeModal}
        >
          <div>
            <h1>
              {state.count === 0
                ? "Sign Up"
                : state.count === 1
                ? "Log In"
                : state.count === 2
                ? "Forgot Username"
                : state.count === 3
                ? "Forgot Password"
                : ""}
            </h1>
            <p>
              {(state.count === 0 || state.count === 1) &&
                "By continuing you agree to our User Agreement and consent to out Privacy Policy"}
              {state.count === 2 &&
                "Tell us the email address associated with your Posts account, and we’ll send you an email with your username."}
              {state.count === 3 &&
                "Tell us the username and email address associated with your Posts account, and we’ll send you an email with a link to reset your password."}
            </p>
            <AuthForm
              handleToggle={handleToggle}
              state={state}
              dispatchFunc={dispatch}
              closeModal={closeModal}
            />
          </div>
        </ModalComponent>
      </PageOverlayComponent>
    </>
  );
}

import { AuthFormState } from "types/states/authFomState";

export async function signupService({ username, emailAddress, handle, password }: AuthFormState): Promise<void> {
    const form: FormData = new FormData();

    form.append("username", username);
    form.append("email_address", emailAddress);
    form.append("handle", handle);
    form.append("password", password);

    try {
        const response: Response = await fetch("/api/v1/auth/signup", {
            method: "POST",
            body: form
        });

        console.log(response.json());
    } catch (e) {
        console.log(e);
    }
}
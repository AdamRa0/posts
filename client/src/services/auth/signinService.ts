import { AuthFormState } from "types/states/authFomState";

export async function signinService({ emailAddress, password }: AuthFormState): Promise<void> {
    const form: FormData = new FormData();

    form.append("email_address", emailAddress);
    form.append("password", password);

    try {
        const response: Response = await fetch("/api/v1/auth/signin", {
            method: "POST",
            body: form
        });

        console.log(response.json());
    } catch (e) {
        console.log(e);
    }
}
import { AuthFormState } from "types/states/authFomState";

export async function signinService({ emailAddress, password }: AuthFormState): Promise<number> {
    const form: FormData = new FormData();

    form.append("email_address", emailAddress);
    form.append("password", password);

    const response: Response = await fetch("/api/v1/auth/signin", {
        method: "POST",
        body: form
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();

    return data;
}
export async function forgotUsernameService(emailAddress: string) {
    const form: FormData = new FormData();

    form.append("email_address", emailAddress);

    const response: Response = await fetch("/api/v1/auth/forgot-username", {
        method: "POST",
        body: form
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
}
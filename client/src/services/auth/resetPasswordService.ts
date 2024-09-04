export async function resetPasswordService(emailAddress?: string, username?: string, password?: string, id?: string) {
    const form: FormData = new FormData();

    if (username) form.append("username", username!);
    if (emailAddress) form.append("email_address", emailAddress!);
    if (password) { 
        form.append("id", id!);
        form.append("password", password!);
    }

    const response: Response = await fetch("/api/v1/auth/reset-password", {
        method: password ? "PATCH" : "POST",
        body: form
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
}
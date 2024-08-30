import { getCookie } from "@helpers/extractCookie";

export async function changePasswordService(password: string) {
    const token = getCookie("csrf_access_token");
    const form: FormData = new FormData();

    form.append("new_password", password);


    const response: Response = await fetch("/api/v1/users/change-password", {
        method: "PATCH",
        headers: {
            "X-CSRF-TOKEN": token!
        },
        body: form
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const data = await response.json();

    return data;
}
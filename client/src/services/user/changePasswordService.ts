import { getCookie } from "@helpers/extractCookie";

export async function changePasswordService(password: string): Promise<number> {
    const token = getCookie("csrf_access_token");
    const form: FormData = new FormData();

    form.append("new_password", password);

    try {
        const response: Response = await fetch("/api/v1/users/change-password", {
            method: "PATCH",
            headers: {
                "X-CSRF-TOKEN": token!
            },
            body: form
        });

        return response.status;
    } catch (e) {
        console.log(e);
        return 500;
    }
}
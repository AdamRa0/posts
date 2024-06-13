export async function getUserService(token: string): Promise<unknown> {
    try {
        const response = await fetch("/api/v1/users/profile", {
            headers: {
                "X_CSRF_TOKEN": token
            }
        })

        return response.json();
    } catch (e) {
        console.log(e);
    }
}